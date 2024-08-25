import type { Eip1193Provider } from 'ethers'

export type EIP1193Provider = Eip1193Provider & {
    on: ConnectEventHandler & DisconnectEventHandler & ChainChangedEventHandler & AccountsEventHandler & MessageEventHandler
}

type ConnectEventHandler = (event: 'connect', listener: (connectInfo: ProviderConnectInfo) => void) => Eip1193Provider
type DisconnectEventHandler = (event: 'disconnect', listener: (error: ProviderRpcError) => void) => Eip1193Provider;
type ChainChangedEventHandler = (event: 'chainChanged', listener: (chainId: string) => void) => Eip1193Provider;
type AccountsEventHandler = (event: 'accountsChanged', listener: (accounts: string[]) => void) => Eip1193Provider;
type MessageEventHandler = (event: 'message', listener: (message: ProviderMessage) => void) => Eip1193Provider;

export interface ProviderConnectInfo {
    readonly chainId: string;
}

export interface ProviderRpcError extends Error {
    message: string;
    code: number;
    data?: unknown;
}

export interface ProviderMessage {
    readonly type: string;
    readonly data: unknown;
}
