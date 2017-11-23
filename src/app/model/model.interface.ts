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
