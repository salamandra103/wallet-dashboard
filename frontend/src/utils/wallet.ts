import { JsonRpcProvider, BrowserProvider } from 'ethers';

export async function initProvider(url?: string) {
  if (checkHaveConnection()) {
    const provider = createProvider(url);
    if ((await provider.listAccounts()).length) {
      localStorage.setItem('wallet.connected', 'true');
    }
    return provider;
  }
}

function checkHaveConnection() {
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

export async function checkMetaMaskAccounts(provider: BrowserProvider): Promise<boolean> {
  if (!window.ethereum) {
    throw new Error('Отсутствует расширение MetaMask или оно отключено!');
  }
  return !!(await provider.listAccounts()).length;
}
