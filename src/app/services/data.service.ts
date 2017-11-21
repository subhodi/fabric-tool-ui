import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from '../../environments/environment';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  submit(peerForm: object) {
  return this.http.post(environment.apiUrl + '/network/yaml-file?fileName=crypto-config.yaml', peerForm);
  }
}
