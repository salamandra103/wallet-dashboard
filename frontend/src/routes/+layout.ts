// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
import { initProvider } from '../utils/wallet';
export const prerender = false;
export const ssr = false;

export async function load() {
  if (!window.wallet) {
    const provider = await initProvider();
    if (provider) {
      const signer = await provider.getSigner();
      window.wallet = {
        provider,
        signer
      };
      return { wallet: window.wallet };
    }
  }
}
