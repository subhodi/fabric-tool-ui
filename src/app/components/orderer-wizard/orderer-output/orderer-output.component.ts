import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orderer-output',
  templateUrl: './orderer-output.component.html',
  styleUrls: ['./orderer-output.component.css']
})
export class OrdererOutputComponent implements OnInit {
  peers: Peer[] = [];
  a: any;
  constructor() {

  }

  ngOnInit() {
    this.peers.push({ containerId: '5d8586f00eae', name: 'ca_peerOrg1', created: '17 hours ago', status: 'Up 17 hours', action: 'remove' });
    this.peers.push({ containerId: '5d8586f00eae', name: 'ca_peerOrg2', created: '17 hours ago', status: 'Up 17 hours', action: 'remove' });
    this.peers.push({ containerId: '5d8586f00eae', name: 'ca_peerOrg3', created: '17 hours ago', status: 'Up 17 hours', action: 'remove' });
    this.peers.push({ containerId: '5d8586f00eae', name: 'ca_peerOrg4', created: '17 hours ago', status: 'Up 17 hours', action: 'remove' });
    this.peers.push({ containerId: '5d8586f00eae', name: 'ca_peerOrg5', created: '17 hours ago', status: 'Up 17 hours', action: 'remove' });
    // this.a = document.getElementById("charging");
    // this.a.innerHTML = "&#xf241;";
  }

}

interface Peer {
  containerId: string;
  name: string;
  created: string;
  status: string;
  action: string;
}
