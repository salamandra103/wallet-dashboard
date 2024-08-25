import { BrowserProvider } from 'ethers';

export function checkHaveConnection() {
  return localStorage.getItem('wallet.connected') === 'true';
}

export function getProvider() {
  if (!window?.ethereum) {
    throw new Error('Отсутствует расширение для кошелька или оно отключено!');
  } else {
    return new BrowserProvider(window.ethereum);
  }
}