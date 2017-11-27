import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-peerorg-form',
  templateUrl: './add-peerorg-form.component.html',
  styleUrls: ['./add-peerorg-form.component.css']
})
export class AddPeerorgFormComponent implements OnInit {
  peers: Peer[] = [];
  a: any;
  peerFile: any;
  constructor() { }

  ngOnInit() {
    this.peers.push({ orgName: 'ca_peerOrg1', domain: 'example.com' });
    this.peers.push({ orgName: 'ca_peerOrg2', domain: 'example.com' });
    this.peers.push({ orgName: 'ca_peerOrg3', domain: 'example.com' });
    this.peers.push({ orgName: 'ca_peerOrg4', domain: 'example.com' });
    this.peers.push({ orgName: 'ca_peerOrg5', domain: 'example.com' });
  }

  upload() {

  }

}

interface Peer {
  orgName: string;
  domain: string;
}

