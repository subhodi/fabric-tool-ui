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
    this.dataService.submit(this.peerForm).subscribe(data => {
      console.log(data);
      this.state = States.cryptoConfigFile;
      this.cryptogen();
    }, err => console.error(err));
  }

  cryptogen() {
    this.dataService.cryptogen().subscribe(data => {
      console.log(data);
      this.state = States.cryptogen;
      this.dockerCompose();
    }, err => console.error(err));
  }

  dockerCompose() {
    this.dataService.dockerCompose().subscribe(data => {
      console.log(data);
      this.state = States.dockerCompose;
      this.startPeer();
    }, err => console.error(err));
  }

  startPeer() {
    this.dataService.startPeer().subscribe(data => {
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


