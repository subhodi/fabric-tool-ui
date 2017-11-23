import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from '../../environments/environment';

@Injectable()
export class OrdererService {

  constructor(private http: Http) { }

  submit(cryptogenForm: object) {
    return this.http.post(environment.apiUrl + '/network/yaml-file?fileName=crypto-config.yaml', cryptogenForm);
  }

  cryptogen() {
    return this.http.post(environment.apiUrl + '/network/cryptogen-generate?fileName=crypto-config.yaml', {});
  }


}
