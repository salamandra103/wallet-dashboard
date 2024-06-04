import { Eip1193Provider } from 'ethers';
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
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
    wallet: {
      provider: JsonRpcProvider | BrowserProvider;
      signer: JsonRpcSigner | undefined;
    };
  }
}

export {};
