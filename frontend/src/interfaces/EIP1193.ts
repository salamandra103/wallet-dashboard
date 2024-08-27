import type { Eip1193Provider } from 'ethers';

export type EIP1193Provider = Eip1193Provider & {
  on: ConnectEventHandler &
    DisconnectEventHandler &
    ChainChangedEventHandler &
    AccountsEventHandler &
    MessageEventHandler;
};

type ConnectEventHandler = (
  event: 'connect',
  listener: (connectInfo: ProviderConnectInfo) => void
) => Eip1193Provider;
type DisconnectEventHandler = (
  event: 'disconnect',
  listener: (error: ProviderRpcError) => void
) => Eip1193Provider;
type ChainChangedEventHandler = (
  event: 'chainChanged',
  listener: (chainId: string) => void
) => Eip1193Provider;
type AccountsEventHandler = (
  event: 'accountsChanged',
  listener: (accounts: string[]) => void
) => Eip1193Provider;
type MessageEventHandler = (
  event: 'message',
  listener: (message: ProviderMessage) => void
) => Eip1193Provider;

export interface ProviderConnectInfo {
  readonly chainId: string;
}

// 4001	User Rejected Request	The user rejected the request.
// 4100	Unauthorized	The requested method and/or account has not been authorized by the user.
// 4200	Unsupported Method	The Provider does not support the requested method.
// 4900	Disconnected	The Provider is disconnected from all chains.
// 4901	Chain Disconnected	The Provider is not connected to the requested chain.
type ProviderRpcErrorCode = 4001 | 4100 | 4200 | 4900 | 4901;

export interface ProviderRpcError extends Error {
  message: string;
  code: ProviderRpcErrorCode;
  data?: unknown;
}

export interface ProviderMessage {
  readonly type: string;
  readonly data: unknown;
}
