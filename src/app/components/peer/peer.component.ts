import { Component, OnInit } from '@angular/core';
import { PeerService } from '../../services/peer.service';

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
  status: string;
  submitStatus: string;
  StateStatus: StateStatus;
  constructor(private peerService: PeerService) {
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
    this.status = 'success';
  }

  submit() {
    this.peerService.submit(this.peerForm).subscribe(data => {
      console.log(data);
      this.state = States.cryptoConfigFile;
      this.cryptogen();
    }, err => console.error(err));
  }

  cryptogen() {
    this.peerService.cryptogen().subscribe(data => {
      console.log(data);
      this.state = States.cryptogen;
      //this.dockerCompose();
      this.submitStatus = 'failure';
    }, err => console.error(err));
  }

  dockerCompose() {
    this.peerService.dockerCompose().subscribe(data => {
      console.log(data);
      this.state = States.dockerCompose;
      this.startPeer();
    }, err => console.error(err));
  }

  startPeer() {
    this.peerService.startPeer().subscribe(data => {
      console.log(data);
      this.state = States.peerUp;
    }, err => console.error(err));
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

enum requestStatus {
  pending = 1,
  success,
  failure
}

interface StateStatus {
  submit: requestStatus;
  cryptoConfigFile: requestStatus;
  cryptogen: requestStatus;
  dockerCompose: requestStatus;
  peerUp: requestStatus;
}


