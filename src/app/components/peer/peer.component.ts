import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-peer',
  templateUrl: './peer.component.html',
  styleUrls: ['./peer.component.css']
})
export class PeerComponent implements OnInit {

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

}

enum State {
  initialized = 1,
  save,
  cryptoConfigFile,
  cryptogen,
  dockerCompose,
  peerUp
}


