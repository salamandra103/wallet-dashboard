import { wallets } from 'store/wallet';

import type { EIP6963AnnounceProviderEvent } from 'interfaces/EIP6963';

import { getProvider } from 'utils/wallet';

export const prerender = false;
export const ssr = false;

function onAnnounce(event: EIP6963AnnounceProviderEvent) {
  const browserProvider = getProvider();
  wallets.update((value) => {
    return [
      ...value,
      {
        meta: {
          ...event.detail.info,
          isActive: false,
          isInProgress: false,
          isDisabled: false
        },
        baseProvider: event.detail.provider,
        provider: browserProvider,
        isBrowser: true
      }
    ];
  });
}

export async function load() {
  window.addEventListener('eip6963:announceProvider', onAnnounce); // Инициализация браузерных кошельков
  window.dispatchEvent(new Event('eip6963:requestProvider'));
}
