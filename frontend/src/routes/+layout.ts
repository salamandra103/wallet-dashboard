import { providers } from 'store/wallet';
import type { EIP6963AnnounceProviderEvent } from 'interfaces/EIP6963';

export const prerender = false;
export const ssr = false;

function onAnnounce(event: EIP6963AnnounceProviderEvent) {
  providers.update((value) => {
    return [
      ...value,
      {
        ...event.detail,
        isActive: false
      }
    ];
  });

  // event.detail.provider.on('connect', (info) => {});
  // event.detail.provider.on('disconnect', (info) => {});
  // event.detail.provider.on('chainChanged', () => {});
}

export async function load() {
  window.addEventListener('eip6963:announceProvider', onAnnounce);
  window.dispatchEvent(new Event('eip6963:requestProvider'));
}
