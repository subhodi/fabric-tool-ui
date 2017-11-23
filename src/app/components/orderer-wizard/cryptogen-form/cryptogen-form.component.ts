import { Component, OnInit } from '@angular/core';

import { RequestStatus, APIResponse } from '../../../model/model.interface';

@Component({
  selector: 'app-cryptogen-form',
  templateUrl: './cryptogen-form.component.html',
  styleUrls: ['./cryptogen-form.component.css']
})

export class CryptogenFormComponent implements OnInit {
  cryptogenForm: Object;
  cryptogen: Object;
  requestStatus=   RequestStatus;
  rs: RequestStatus;
  StateStatus: any = {};
  apiResponse: APIResponse;
  constructor() { }

  ngOnInit() {
    this.cryptogen = { name: 'Orderer', domain: 'example.com', host: 'orderer' };
    this.cryptogenForm = {
      'OrdererOrgs': [
        {
          'Name': 'Orderer',
          'Domain': 'example.com',
          'Specs': [
            {
              'Hostname': 'orderer'
            }
          ]
        }
      ]
    };
    this.apiResponse = { 'status': true, 'message': 'Hit submit to start', path: null };
    this.rs = RequestStatus.failure;
    console.log(this.rs);

  }

}

