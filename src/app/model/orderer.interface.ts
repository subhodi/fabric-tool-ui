import { RequestStatus, APIResponse } from './model.interface';

interface Orderer {
    org: string;
    domain: string;
    host: string;
}

interface OrdererCryptoConfig {
    name: string;
    domain: string;
    host: string;
}

interface OrdererCryptoConfigStates {
    save: RequestStatus;
    cryptoConfigFile: RequestStatus;
    cryptogen: RequestStatus;

}

interface OrdererConfigtx {
    ordererType: string;
    maxMessageCount: number;
    batchTimeout: string;
    absoluteMaxBytes: string;
    preferredMaxBytes: String;
}

interface OrdererConfigtxStates {
    save: RequestStatus;
    configTx: RequestStatus;
    genesisBlock: RequestStatus;
    channelTx: RequestStatus;
    dockerCompose: RequestStatus;
    peerUp: RequestStatus;
}

export {
    RequestStatus, APIResponse, Orderer, OrdererCryptoConfig,
    OrdererCryptoConfigStates, OrdererConfigtx, OrdererConfigtxStates
};
