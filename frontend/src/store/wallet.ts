import { writable } from 'svelte/store';
import type { EIP6963ProviderDetail } from 'interfaces/EIP6963';
import { createProvider } from 'utils/wallet';

export const providers = writable<EIP6963ProviderDetail[]>([]);
export const currentProvider = writable<EIP6963ProviderDetail>();

currentProvider.subscribe((providerDetail) => {
  console.log(providerDetail);
  if (providerDetail) {
    const activeProvider = createProvider();
    activeProvider.on('accountsChanged', (accounts: any) => {
      debugger;
    });
    activeProvider.on('connect', (info: any) => {
      debugger;
    });
    console.log(activeProvider);
  }
});
