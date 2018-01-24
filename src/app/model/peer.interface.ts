import { RequestStatus, APIResponse } from './model.interface';

interface Peer {
    orgName: string;
    domain: string;
}

interface PeerCryptoConfig {
    name: string;
    domain: string;
    peerCount: number;
    userCount: number;
}

interface PeerStates {
    save: RequestStatus;
    cryptoConfigFile: RequestStatus;
    cryptogen: RequestStatus;
    dockerCompose: RequestStatus;
    peerUp: RequestStatus;
}

export { RequestStatus, APIResponse, Peer, PeerCryptoConfig, PeerStates };

