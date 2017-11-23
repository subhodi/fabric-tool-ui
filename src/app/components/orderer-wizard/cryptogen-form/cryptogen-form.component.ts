import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { OrdererService } from '../../../services/orderer.service';

import { RequestStatus, APIResponse } from '../../../model/model.interface';

@Component({
  selector: 'app-cryptogen-form',
  templateUrl: './cryptogen-form.component.html',
  styleUrls: ['./cryptogen-form.component.css']
})

export class CryptogenFormComponent implements OnInit {
  cryptogenForm: Object;
  orderer: Object;
  StateStatus: any = {};
  apiResponse: APIResponse;
  requestStatus = RequestStatus;
  constructor(private ordererService: OrdererService, private route: ActivatedRoute,
    private router: Router) { }

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
    this.apiResponse = { 'status': true, 'message': 'Hit submit to start', path: null };
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
    this.StateStatus.submit = RequestStatus.success;
    this.StateStatus.cryptoConfigFile = RequestStatus.pending;
    this.StateStatus.cryptogen = RequestStatus.pending;
    this.apiResponse = { 'status': true, 'message': 'Hit submit to start', path: null };
  }

  submit() {
    this.ordererService.submit(this.cryptogenForm).subscribe(data => {
      this.StateStatus.cryptoConfigFile = RequestStatus.success;
      this.apiResponse = { 'message': JSON.parse(data['_body'])['message'], 'status': true, path: JSON.parse(data['_body'])['path'] };
      this.cryptogen();
    }, err => {
      console.error(err);
      this.StateStatus.cryptoConfigFile = RequestStatus.failure;
      this.apiResponse = { 'message': JSON.parse(err['_body'])['message'], 'status': false, path: null };
    });
  }

  cryptogen() {
    this.ordererService.cryptogen().subscribe(data => {
      console.log(data);
      this.StateStatus.cryptogen = RequestStatus.success;
      this.apiResponse = { 'message': JSON.parse(data['_body'])['message'], 'status': true, path: JSON.parse(data['_body'])['path'] };
      this.router.navigate(['/orderer', { outlets: { ordererSection: 'orderer-service' } }]);
    }, err => {
      console.error(err);
      this.StateStatus.cryptogen = RequestStatus.failure;
      this.apiResponse = { 'message': JSON.parse(err['_body'])['message'], 'status': false, path: null };
    });
  }

}

