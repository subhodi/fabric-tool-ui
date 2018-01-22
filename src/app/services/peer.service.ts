import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from '../../environments/environment';

@Injectable()
export class PeerService {

  constructor(private http: Http) { }

  getPeer() {
    return localStorage.getItem('peer') !== null ? JSON.parse(localStorage.getItem('peer')) : null;
  }

  export(peerName, orgName, domainName) {
    window.open(environment.apiUrl + '/network/peer/' + peerName + '?orgName=' + orgName + '&domain=' + domainName);
  }

  submit(peerForm: object) {
    const peerOrgs = peerForm['PeerOrgs'][0];
    localStorage.setItem('peer', JSON.stringify({ 'orgName': peerOrgs['Name'], 'domain': peerOrgs['Domain'] }));
    return this.http.post(environment.apiUrl + '/network/yaml-file?fileName=crypto-config.yaml', peerForm);
  }

  cryptogen() {
    return this.http.post(environment.apiUrl + '/network/cryptogen-generate?fileName=crypto-config.yaml', {});
  }

  dockerCompose() {
    return this.http.post(environment.apiUrl + '/network/docker-compose?fileName=docker-compose.yaml', {});
  }

  startPeer() {
    return this.http.post(environment.apiUrl + '/network?fileName=docker-compose.yaml', {});
  }
}
