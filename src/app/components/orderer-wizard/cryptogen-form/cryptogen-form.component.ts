import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cryptogen-form',
  templateUrl: './cryptogen-form.component.html',
  styleUrls: ['./cryptogen-form.component.css']
})
export class CryptogenFormComponent implements OnInit {
  peerForm: Object;
  peer: Object;
  requestStatus = RequestStatus;
  StateStatus: any = {};
  apiResponse: APIResponse;
  constructor() { }

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
    this.apiResponse = { 'status': true, 'message': 'Hit submit to start', path: null };
  }

}

enum RequestStatus {
  pending = 1,
  success,
  failure
}

interface APIResponse {
  status: boolean;
  message: string;
  path: string;
}
