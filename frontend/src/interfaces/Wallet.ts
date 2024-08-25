import { BrowserProvider } from 'ethers'
import type { EIP6963ProviderInfo } from 'interfaces/EIP6963';
import type { EIP1193Provider } from 'interfaces/EIP1193';

type Meta = {
    isActive: boolean,
    isProgress: boolean,
}

type BaseWallet<T extends Meta, P extends Provider> = {
    meta: T,
    provider: P,
}

type BrowserWallet = BaseWallet<EIP6963ProviderInfo & Meta, BrowserProvider> & {
    isBrowser: boolean
    baseProvider: EIP1193Provider
}

export type Provider = BrowserProvider
export type Wallet = BrowserWallet