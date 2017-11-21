import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-peer',
  templateUrl: './peer.component.html',
  styleUrls: ['./peer.component.css']
})
export class PeerComponent implements OnInit {
  State= State;
  state: State;
  peerForm: Object;
  peer: Object;
  constructor() { }

  ngOnInit() {
    this.state = State.initialized;
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
    this.state = State.save;
  }

  submit() {
    this.state = State.cryptoConfigFile;
    // $http.post(peerApiUrl + "yaml-file?fileName=crypto-config.yaml", peerForm).then(function (response) {
    //     console.log(response);
    //     response = response.data.message + " at " + response.data.path;
    //     state = states.cryptoConfigFile;
    // }, function (errorResponse) {
    //     console.log(errorResponse);
    //     response = response.data.message;
    // });
  }

  cryptogen() {
    this.state = State.cryptogen;
    // $http.post(peerApiUrl + "cryptogen-generate?fileName=crypto-config.yaml").then(function (response) {
    //     console.log(response);
    //     response = response.data.message + " at " + response.data.path;
    //     state = states.cryptogen;
    // }, function (errorResponse) {
    //     console.log(errorResponse);
    //     response = response.data.message;

    // });
  }

  dockerCompose() {
    this.state = State.dockerCompose;
    // $http.post(peerApiUrl + "docker-compose?fileName=docker-compose.yaml").then(function (response) {
    //     console.log(response);
    //     response = response.data.message;
    //     state = states.dockerCompose;
    // }, function (errorResponse) {
    //     console.log(errorResponse);
    //     response = response.data.message;

    // });
  }

  startPeer() {
    this.state = State.peerUp;
    // $http.post(peerApiUrl + "?fileName=docker-compose.yaml").then(function (response) {
    //     console.log(response);
    //     response = response.data.message;
    //     state = states.peerUp;
    // }, function (errorResponse) {
    //     console.log(errorResponse);
    //     response = response.data.message;

    // });
  }

}

enum State {
  initialized = 1,
  save,
  cryptoConfigFile,
  cryptogen,
  dockerCompose,
  peerUp
}


