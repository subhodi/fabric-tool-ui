export enum RequestStatus {
  pending = 1,
  success,
  failure
}

export interface APIResponse {
  status: boolean;
  message: string;
  path: string;
}

export interface Orderer {
  org: string;
  domain: string;
  host: string;
}

export interface Peer {
  orgName: string;
  domain: string;
}

export interface PeerCryptoConfig {
  name: string;
  domain: string;
  peerCount: number;
  userCount: number;
}

export interface PeerStates {
  save: RequestStatus;
  cryptoConfigFile: RequestStatus;
  cryptogen: RequestStatus;
  dockerCompose: RequestStatus;
  peerUp: RequestStatus;
}

export interface OrdererCryptoConfig {
  name: string;
  domain: string;
  host: string;
}

export interface OrdererCryptoConfigStates {
  save: RequestStatus;
  cryptoConfigFile: RequestStatus;
  cryptogen: RequestStatus;

}
