import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import {Orderer, Peer } from '../model/model.interface';
import { environment } from '../../environments/environment';

@Injectable()
export class OrdererService {
  orderer: Orderer;
  peers: Peer[] = [];
  constructor(private http: Http) { }

  getSystemStats() {
    return this.http.get(environment.apiUrl + '/network/stats');
  }

  getOrderer() {
    return this.orderer ? this.orderer : JSON.parse(localStorage.getItem('orderer'));
  }

  getPeers() {
    return this.peers ? this.peers : JSON.parse(localStorage.getItem('peers'));
  }

  submit(cryptogenForm: object) {
    const orderer: Object = cryptogenForm['OrdererOrgs'][0];
    this.orderer = { 'org': orderer['Name'], 'domain': orderer['Domain'], 'host': orderer['Specs'][0]['Hostname'] };
    localStorage.setItem('orderer', JSON.stringify(this.orderer));
    return this.http.post(environment.apiUrl + '/network/yaml-file?fileName=crypto-config.yaml', cryptogenForm);
  }

  cryptogen() {
    return this.http.post(environment.apiUrl + '/network/cryptogen-generate?fileName=crypto-config.yaml', {});
  }

  configTx(configtxForm) {
    return this.http.post(environment.apiUrl + '/network/yaml-file?fileName=configtx.yaml', configtxForm);
  }

  genesisBlock() {
    return this.http.post(environment.apiUrl + '/network/genesis-block?profileName=TwoOrgsOrdererGenesis', {});
  }

  channelTx() {
    return this.http.post(environment.apiUrl + '/network/channel?profileName=TwoOrgsChannel&channelName=SampleConsortium', {});
  }

  anchorPeer() {
    return this.http.post(environment.apiUrl +
      '/network/anchor-peer-file?profileName=TwoOrgsChannel&channelName=SampleConsortium&orgName=Org1', {});
  }

  dockerCompose() {
    return this.http.post(environment.apiUrl + '/network/docker-compose?fileName=docker-compose.yaml', {});
  }

  startPeer() {
    return this.http.post(environment.apiUrl + '/network/?fileName=docker-compose.yaml', {});
  }

  upload(orgName: string, domain: string, fileToUpload: any) {
    this.peers.push({ 'orgName': orgName, 'domain': domain });
    const input = new FormData();
    input.append('file', fileToUpload);
    return this.http.post(environment.apiUrl + '/network/org/' + orgName, input);
  }

}
