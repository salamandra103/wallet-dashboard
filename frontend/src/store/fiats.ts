import { writable } from 'svelte/store';
import type { Fiat } from 'interfaces/fiat';

export const tokens = writable<Fiat[]>();
