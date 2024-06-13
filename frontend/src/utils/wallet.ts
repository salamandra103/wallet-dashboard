import { JsonRpcProvider, BrowserProvider } from 'ethers';

import type { EIP6963ProviderDetail } from '../interfaces/EIP6963';

export function checkHaveConnection() {
  return localStorage.getItem('wallet.connected') === 'true';
}

export function createProvider(url?: string) {
  if (url === undefined) {
    if (!window?.ethereum) {
      throw new Error('Отсутствует расширение MetaMask или оно отключено!');
    } else {
      return new BrowserProvider(window.ethereum);
    }
  } else {
    return new JsonRpcProvider(url);
  }
}

export const connectBrowserProvider = async (
  providerDetail: EIP6963ProviderDetail
): Promise<string[] | void> => {
  let addreses: string[] = [];
  try {
    addreses = await providerDetail.provider.request({ method: 'eth_requestAccounts' });
  } catch (error) {
    console.error('Failed to connect to provider:', error);
  }
  localStorage.setItem('wallet.connected', 'true');
  return addreses;
};
