import { Component, OnInit } from '@angular/core';
import { PeerService } from '../../services/peer.service';

@Component({
  selector: 'app-peer',
  templateUrl: './peer.component.html',
  styleUrls: ['./peer.component.css']
})
export class PeerComponent implements OnInit {
  peerForm: Object;
  peer: Object;
  status: string;
  requestStatus = RequestStatus;
  StateStatus: any = {};

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
  }

  submit() {
    this.peerService.submit(this.peerForm).subscribe(data => {
      console.log(data);
      this.StateStatus.cryptoConfigFile = RequestStatus.success;
      this.cryptogen();
    }, err => {
      console.error(err);
      this.StateStatus.cryptoConfigFile = RequestStatus.failure;
    });
  }

  cryptogen() {
    this.peerService.cryptogen().subscribe(data => {
      console.log(data);
      this.StateStatus.cryptogen = RequestStatus.success;
      this.dockerCompose();
    }, err => {
      console.error(err);
      this.StateStatus.cryptogen = RequestStatus.failure;
    });
  }

  dockerCompose() {
    this.peerService.dockerCompose().subscribe(data => {
      console.log(data);
      this.StateStatus.dockerCompose = RequestStatus.success;
      this.startPeer();
    }, err => {
      console.error(err);
      this.StateStatus.dockerCompose = RequestStatus.failure;
    });
  }

  startPeer() {
    this.peerService.startPeer().subscribe(data => {
      console.log(data);
      this.StateStatus.peerUp = RequestStatus.success;
    }, err => {
      console.error(err);
      this.StateStatus.peerUp = RequestStatus.failure;
    });
  }

}

enum RequestStatus {
  pending = 1,
  success,
  failure
}



