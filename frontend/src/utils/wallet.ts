import { JsonRpcProvider, BrowserProvider } from 'ethers';

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
