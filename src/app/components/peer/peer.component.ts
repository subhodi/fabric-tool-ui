import { Component, OnInit } from '@angular/core';
import { PeerService } from '../../services/peer.service';
import { RequestStatus, APIResponse, PeerCryptoConfig, PeerStates } from '../../model/peer.interface';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-peer',
  templateUrl: './peer.component.html',
  styleUrls: ['./peer.component.css']
})
export class PeerComponent implements OnInit {
  peerForm: Object;
  peer: PeerCryptoConfig;
  requestStatus = RequestStatus;
  state: PeerStates;
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
    this.apiResponse = { status: true, message: 'Hit Save to start', path: null };
    this.state = {
      save: undefined,
      cryptoConfigFile: undefined,
      cryptogen: undefined,
      dockerCompose: undefined,
      peerUp: undefined
    };
  }

  export() {
    const peer = this.peerService.getPeer();
    this.peerService.export('peer0', peer.orgName, peer.domain);
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

    this.state = {
      save : RequestStatus.success,
      cryptoConfigFile: undefined,
      cryptogen: undefined,
      dockerCompose: undefined,
      peerUp: undefined
    };
    this.apiResponse = { 'status': true, 'message': 'Hit submit to start', path: null };
  }

  submit() {
    this.peerService.submit(this.peerForm).subscribe(data => {
      this.state.cryptoConfigFile = RequestStatus.success;
      this.state.cryptogen = RequestStatus.pending;
      this.state.dockerCompose = RequestStatus.pending;
      this.state.peerUp = RequestStatus.pending;

      this.apiResponse = { 'message': JSON.parse(data['_body'])['message'], 'status': true, path: JSON.parse(data['_body'])['path'] };
      this.cryptogen();
    }, err => {
      console.error(err);
      this.state.cryptoConfigFile = RequestStatus.failure;
      this.apiResponse = { 'message': JSON.parse(err['_body'])['message'], 'status': false, path: null };
    });
  }

  cryptogen() {
    this.peerService.cryptogen().subscribe(data => {
      console.log(data);
      this.state.cryptogen = RequestStatus.success;
      this.apiResponse = { 'message': JSON.parse(data['_body'])['message'], 'status': true, path: JSON.parse(data['_body'])['path'] };
      this.dockerCompose();
    }, err => {
      console.error(err);
      this.state.cryptogen = RequestStatus.failure;
      this.apiResponse = { 'message': JSON.parse(err['_body'])['message'], 'status': false, path: null };
    });
  }

  dockerCompose() {
    this.peerService.dockerCompose().subscribe(data => {
      console.log(data);
      this.state.dockerCompose = RequestStatus.success;
      this.apiResponse = { 'message': JSON.parse(data['_body'])['message'], 'status': true, path: JSON.parse(data['_body'])['path'] };
      this.startPeer();
    }, err => {
      console.error(err);
      this.state.dockerCompose = RequestStatus.failure;
      this.apiResponse = { 'message': JSON.parse(err['_body'])['message'], 'status': false, path: null };
    });
  }

  startPeer() {
    this.peerService.startPeer().subscribe(data => {
      console.log(data);
      this.state.peerUp = RequestStatus.success;
      this.apiResponse = { 'message': JSON.parse(data['_body'])['message'], 'status': true, path: JSON.parse(data['_body'])['path'] };
    }, err => {
      console.error(err);
      this.state.peerUp = RequestStatus.failure;
      this.apiResponse = { 'message': JSON.parse(err['_body'])['message'], 'status': false, path: null };
    });
  }

}
