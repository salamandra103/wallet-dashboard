import { writable, get } from 'svelte/store';
import type { Unsubscriber } from 'svelte/store';
import type { EIP6963AnnounceProviderEvent, EIP6963ProviderDetail } from '../interfaces/EIP6963';
import { createProvider } from '../utils/wallet';

export const providers = writable<EIP6963ProviderDetail[]>([]);
export const currentProvider = writable<EIP6963ProviderDetail>();

interface ConnectInfo {
  chainId: string;
}

currentProvider.subscribe((providerDetail) => {
  console.log(providerDetail);
  if (providerDetail) {
    // const activeProvider = createProvider();
    // providerDetail.provider.on('accountsChanged', (accounts) => {
    //   debugger;
    // });
    // providerDetail.provider.on('connect', (info) => {
    //   debugger;
    // });
    // console.log(providerDetail.provider);
    // debugger;
    // subscribeConnect();
  }
});

export function subscribeAnnounceProvider() {
  function onAnnounce(event: EIP6963AnnounceProviderEvent) {
    providers.update((value) => {
      if (event.detail) {
        event.detail.provider.on('connect', (info) => {
          debugger;
        });
        event.detail.provider.on('connect', (info) => {
          debugger;
        });
        event.detail.provider.on('disconnect', (info) => {
          debugger;
        });

        event.detail.provider.on('chainChanged', () => {
          debugger;
        });
      }
      return [
        ...value,
        {
          ...event.detail,
          isActive: false
        }
      ];
    });
  }
  window.addEventListener('eip6963:announceProvider', onAnnounce);

  return () => {
    window.addEventListener('eip6963:announceProvider', onAnnounce);
  };
}

export function requestProvider() {
  window.dispatchEvent(new Event('eip6963:requestProvider'));
}

export function subscribeAccountsChanged() {}

export function subscribeConnect(connectInfo: ConnectInfo) {
  debugger;
  console.log(connectInfo);
}

export const connectBrowserProvider = async (
  providerDetail: EIP6963ProviderDetail
): Promise<string[] | void> => {
  // unsubscribeCurrentProvider();
  let addreses: string[] = [];
  try {
    addreses = await providerDetail.provider.request({ method: 'eth_requestAccounts' });
    currentProvider.set(providerDetail);
  } catch (error) {
    console.error('Failed to connect to provider:', error);
  }
  localStorage.setItem('wallet.connected', 'true');
  return addreses;
};
