import { writable } from 'svelte/store';
import type { Token } from 'interfaces/token';

export const tokens = writable<Token[]>();
