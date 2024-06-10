import { Eip1193Provider } from 'ethers';
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  interface Window {
    ethereum: Eip1193Provider;
  }
}

export {};
