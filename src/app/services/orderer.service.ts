import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from '../../environments/environment';

@Injectable()
export class OrdererService {
  orderer: Orderer;
  constructor(private http: Http) { }

  getOrderer() {
    return this.orderer;
  }

  submit(cryptogenForm: object) {
    const orderer: Object = cryptogenForm['OrdererOrgs'][0];
    this.orderer = { 'org': orderer['Name'], 'domain': orderer['Domain'], 'host': orderer['Specs'][0]['Hostname'] };
    return this.http.post(environment.apiUrl + '/network/yaml-file?fileName=crypto-config.yaml', cryptogenForm);
  }

  cryptogen() {
    return this.http.post(environment.apiUrl + '/network/cryptogen-generate?fileName=crypto-config.yaml', {});
  }


}

interface Orderer {
  org: string;
  domain: string;
  host: string;
}
