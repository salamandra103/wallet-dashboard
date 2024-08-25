import { writable } from 'svelte/store';
import type { Wallet, Provider } from 'interfaces/Wallet';

export const wallets = writable<Wallet[]>([]);

wallets.subscribe((prevWallets) => {
  prevWallets.forEach(wallet => {
    wallet.baseProvider.on('connect', (connectInfo) => {
    });
    wallet.baseProvider.on('disconnect', (error) => {
    });
    wallet.baseProvider.on('chainChanged', (chainId) => {
    });
    wallet.baseProvider.on('accountsChanged', (accounts) => {
    });
    wallet.baseProvider.on('message', (message) => {
    });
  })
});

export async function connectWallet(
  provider: Provider
): Promise<string | null> {
  let address: string | null = null;
  try {
    wallets.update((prevWallets) => {
      prevWallets.forEach(wallet => {
        wallet.meta.isProgress = true;
        wallet.meta.isActive = false;
      })

      return prevWallets
    })

    let signer = await provider.getSigner();
    address = await signer.getAddress()

    wallets.update((prevWallets) => {
      let activeWallet = prevWallets.find(wallet => wallet.provider === provider)

      if (!activeWallet) {
        return prevWallets;
      }

      prevWallets.forEach(wallet => {
        if (wallet === activeWallet) {
          wallet.meta.isActive = true;
        }
        wallet.meta.isProgress = false
      })


      prevWallets.reduce((acc, wallet) => {
        if (wallet.provider === provider) {
          activeWallet = wallet;
        }
        return acc
      }, prevWallets);


      return prevWallets
    });

  } catch (error) {
    console.error('Failed to connect to provider:', error);
  }
  localStorage.setItem('wallet.connected', 'true');
  return address;
};


