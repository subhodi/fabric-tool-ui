import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OrdererService } from '../../../services/orderer.service';

import { RequestStatus, APIResponse, OrdererCryptoConfig, OrdererCryptoConfigStates } from '../../../model/orderer.interface';

@Component({
  selector: 'app-cryptogen-form',
  templateUrl: './cryptogen-form.component.html',
  styleUrls: ['./cryptogen-form.component.css']
})

export class CryptogenFormComponent implements OnInit {
  cryptogenForm: Object;
  orderer: OrdererCryptoConfig;
  state: OrdererCryptoConfigStates;
  apiResponse: APIResponse;
  requestStatus = RequestStatus;
  constructor(private ordererService: OrdererService, private router: Router) { }

  ngOnInit() {
    this.orderer = { name: 'Orderer', domain: 'example.com', host: 'orderer' };
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
    this.apiResponse = { status: true, message: 'Hit Save to start', path: null };
    this.state = {
      save: undefined,
      cryptoConfigFile: undefined,
      cryptogen: undefined
    };
  }

  save(orderer) {
    this.cryptogenForm = {
      'OrdererOrgs': [
        {
          'Name': orderer.name,
          'Domain': orderer.domain,
          'Specs': [
            {
              'Hostname': orderer.host
            }
          ]
        }
      ]
    };
    this.state = {
      save: RequestStatus.success,
      cryptoConfigFile: undefined,
      cryptogen: undefined
    };
    this.apiResponse = { 'status': true, 'message': 'Hit submit to start', path: null };
  }

  submit() {
    this.ordererService.submit(this.cryptogenForm).subscribe(data => {
      this.state.cryptoConfigFile = RequestStatus.success;
      this.state.cryptogen = RequestStatus.pending;
      this.apiResponse = { 'message': JSON.parse(data['_body'])['message'], 'status': true, path: JSON.parse(data['_body'])['path'] };
      this.cryptogen();
    }, err => {
      console.error(err);
      this.state.cryptoConfigFile = RequestStatus.failure;
      this.apiResponse = { 'message': JSON.parse(err['_body'])['message'], 'status': false, path: null };
    });
  }

  cryptogen() {
    this.ordererService.cryptogen().subscribe(data => {
      console.log(data);
      this.state.cryptogen = RequestStatus.success;
      this.apiResponse = { 'message': JSON.parse(data['_body'])['message'], 'status': true, path: JSON.parse(data['_body'])['path'] };
      // this.router.navigate(['/orderer', { outlets: { ordererSection: 'add-peerorg' } }]);
    }, err => {
      console.error(err);
      this.state.cryptogen = RequestStatus.failure;
      this.apiResponse = { 'message': JSON.parse(err['_body'])['message'], 'status': false, path: null };
    });
  }

}

