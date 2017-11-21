import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-peer',
  templateUrl: './peer.component.html',
  styleUrls: ['./peer.component.css']
})
export class PeerComponent implements OnInit {
  State = States;
  state: States;
  peerForm: Object;
  peer: Object;
  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.state = States.initialized;
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
    this.state = States.save;
  }

  submit() {
    this.state = States.cryptoConfigFile;
    this.dataService.submit(this.peerForm).subscribe(data => {
      console.log(data);
    }, err => console.error(err));
  }

  cryptogen() {
    this.state = States.cryptogen;
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
    this.state = States.dockerCompose;
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
    this.state = States.peerUp;
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

enum States {
  initialized = 1,
  save,
  cryptoConfigFile,
  cryptogen,
  dockerCompose,
  peerUp
}


