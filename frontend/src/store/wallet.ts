import { writable } from 'svelte/store';
import type { Wallet, Provider } from 'interfaces/Wallet';
import type { EIP1193Provider, ProviderRpcError } from 'interfaces/EIP1193';

export const wallets = writable<Wallet[]>([]);

wallets.subscribe((prevWallets) => {
  prevWallets.forEach((wallet) => {
    wallet.baseProvider.on('connect', (connectInfo) => {});
    wallet.baseProvider.on('disconnect', (error) => {});
    wallet.baseProvider.on('chainChanged', (chainId) => {});
    wallet.baseProvider.on('accountsChanged', (accounts) => {});
    wallet.baseProvider.on('message', (message) => {});
  });
});

function resetWalletsMeta() {
  wallets.update((prevWallets) => {
    prevWallets.forEach((wallet) => {
      wallet.meta.isDisabled = false;
      wallet.meta.isActive = false;
      wallet.meta.isInProgress = false;
    });
    return prevWallets;
  });
}

export async function connectWallet(
  baseProvider: EIP1193Provider,
  provider?: Provider
): Promise<string | null> {
  let address: string | null = null;
  try {
    wallets.update((prevWallets) => {
      prevWallets.forEach((wallet) => {
        wallet.meta.isDisabled = true;
        wallet.meta.isActive = false;
        wallet.meta.isInProgress = false;

        if (wallet.provider === provider) {
          wallet.meta.isInProgress = true;
        }
      });

      return prevWallets;
    });

    address = await baseProvider
      .request({ method: 'eth_requestAccounts' })
      .then((res) => {
        return res[0] as string;
      })
      .catch((err: ProviderRpcError) => {
        console.error(err);

        if (err.code === 4001) {
          resetWalletsMeta();
        }

        return null;
      });

    if (!address) {
      return null;
    }

    // if (provider) {
    //   const signer = await provider.getSigner();
    //   address = await signer.getAddress();
    // }

    wallets.update((prevWallets) => {
      let activeWallet = prevWallets.find((wallet) => wallet.provider === provider);

      if (!activeWallet) {
        return prevWallets;
      }

      prevWallets.forEach((wallet) => {
        if (wallet === activeWallet) {
          wallet.meta.isActive = true;
        }
        wallet.meta.isInProgress = false;
        wallet.meta.isDisabled = false;
      });

      prevWallets.reduce((acc, wallet) => {
        if (wallet.provider === provider) {
          activeWallet = wallet;
        }
        return acc;
      }, prevWallets);

      return prevWallets;
    });
  } catch (error) {
    console.error('Failed to connect to provider:', error);
  }
  localStorage.setItem('wallet.connected', 'true');
  return address;
}
