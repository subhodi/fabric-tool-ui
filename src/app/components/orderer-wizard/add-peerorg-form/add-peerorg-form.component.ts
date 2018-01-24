import { Component, OnInit, ViewChild } from '@angular/core';

import { OrdererService } from '../../../services/orderer.service';

import { RequestStatus, APIResponse } from '../../../model/orderer.interface';
import { Peer } from '../../../model/peer.interface';

@Component({
  selector: 'app-add-peerorg-form',
  templateUrl: './add-peerorg-form.component.html',
  styleUrls: ['./add-peerorg-form.component.css']
})

export class AddPeerorgFormComponent implements OnInit {
  peers: Peer[] = [];
  peerFile: any; // Input file element
  apiResponse: APIResponse;
  @ViewChild('peerFile') fileInput;
  constructor(private ordererService: OrdererService) { }

  ngOnInit() {
    this.apiResponse = { 'status': true, 'message': 'Hit Upload to start', path: null };
  }

  upload() {
    const fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      const fileToUpload = fi.files[0];
      const peerData = fileToUpload.name.split('.');
      this.ordererService.upload(peerData[0], peerData[1] + '.' + [peerData[2]], fileToUpload)
        .subscribe(data => {
          this.peers.push({ orgName: peerData[0], domain: peerData[1] + '.' + [peerData[2]] });
          this.apiResponse = { 'message': JSON.parse(data['_body'])['message'], 'status': true, path: JSON.parse(data['_body'])['path'] };
        }, err => {
          this.apiResponse = { 'message': JSON.parse(err['_body'])['message'], 'status': false, path: null };
        });
    }
  }

}

