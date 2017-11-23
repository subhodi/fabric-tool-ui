import { Component, OnInit } from '@angular/core';
import { PeerService } from '../../services/peer.service';
import { RequestStatus, APIResponse } from '../../model/model.interface';

@Component({
  selector: 'app-peer',
  templateUrl: './peer.component.html',
  styleUrls: ['./peer.component.css']
})
export class PeerComponent implements OnInit {
  peerForm: Object;
  peer: Object;
  requestStatus = RequestStatus;
  StateStatus: any = {};
  apiResponse: APIResponse;

  constructor(private peerService: PeerService) {
  }

  ngOnInit() {
    this.peer = { name: 'Org1', domain: 'org1.example.com', peerCount: 2, userCount: 1 };
    this.peerForm = {
      'PeerOrgs': [
        {
          'Name': 'Org1',
          'Domain': 'org1.example.com',
          'Template': {
            'Count': 2
          },
          'Users': {
            'Count': 1
          }
        }
      ]
    };
    this.apiResponse = { 'status': true, 'message': 'Hit submit to start', path: null };
  }

  save(peer) {
    this.peerForm = {
      'PeerOrgs': [
        {
          'Name': peer.name,
          'Domain': peer.domain,
          'Template': {
            'Count': peer.peerCount
          },
          'Users': {
            'Count': peer.userCount
          }
        }
      ]
    };
    this.StateStatus.submit = RequestStatus.success;
    this.StateStatus.cryptoConfigFile = RequestStatus.pending;
    this.StateStatus.cryptogen = RequestStatus.pending;
    this.StateStatus.dockerCompose = RequestStatus.pending;
    this.StateStatus.peerUp = RequestStatus.pending;
    this.apiResponse = { 'status': true, 'message': 'Hit submit to start', path: null };
  }

  submit() {
    this.peerService.submit(this.peerForm).subscribe(data => {
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
    this.peerService.cryptogen().subscribe(data => {
      console.log(data);
      this.StateStatus.cryptogen = RequestStatus.success;
      this.apiResponse = { 'message': JSON.parse(data['_body'])['message'], 'status': true, path: JSON.parse(data['_body'])['path'] };
      this.dockerCompose();
    }, err => {
      console.error(err);
      this.StateStatus.cryptogen = RequestStatus.failure;
      this.apiResponse = { 'message': JSON.parse(err['_body'])['message'], 'status': false, path: null };
    });
  }

  dockerCompose() {
    this.peerService.dockerCompose().subscribe(data => {
      console.log(data);
      this.StateStatus.dockerCompose = RequestStatus.success;
      this.apiResponse = { 'message': JSON.parse(data['_body'])['message'], 'status': true, path: JSON.parse(data['_body'])['path'] };
      this.startPeer();
    }, err => {
      console.error(err);
      this.StateStatus.dockerCompose = RequestStatus.failure;
      this.apiResponse = { 'message': JSON.parse(err['_body'])['message'], 'status': false, path: null };
    });
  }

  startPeer() {
    this.peerService.startPeer().subscribe(data => {
      console.log(data);
      this.StateStatus.peerUp = RequestStatus.success;
      this.apiResponse = { 'message': JSON.parse(data['_body'])['message'], 'status': true, path: JSON.parse(data['_body'])['path'] };
    }, err => {
      console.error(err);
      this.StateStatus.peerUp = RequestStatus.failure;
      this.apiResponse = { 'message': JSON.parse(err['_body'])['message'], 'status': false, path: null };
    });
  }

}


