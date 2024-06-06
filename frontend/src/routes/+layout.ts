import { requestProvider, subscribeAnnounceProvider } from '../store/wallet';
export const prerender = false;
export const ssr = false;

export async function load() {
  subscribeAnnounceProvider();
  requestProvider();
}
