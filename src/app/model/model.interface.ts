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

