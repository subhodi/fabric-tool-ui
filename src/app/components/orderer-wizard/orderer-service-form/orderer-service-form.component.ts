import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OrdererService } from '../../../services/orderer.service';

import { RequestStatus, APIResponse, Orderer, OrdererConfigtx, OrdererConfigtxStates } from '../../../model/orderer.interface';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-orderer-service-form',
  templateUrl: './orderer-service-form.component.html',
  styleUrls: ['./orderer-service-form.component.css']
})
export class OrdererServiceFormComponent implements OnInit {
  configtxForm: Object;
  orderer: Orderer;
  configtx: OrdererConfigtx;
  state: OrdererConfigtxStates;
  apiResponse: APIResponse;
  requestStatus = RequestStatus;
  constructor(private ordererService: OrdererService, private router: Router) {
    this.orderer = ordererService.getOrderer();
  }

  ngOnInit() {
    this.configtx = {
      ordererType: 'solo',
      maxMessageCount: 10,
      batchTimeout: '2s',
      absoluteMaxBytes: '98 MB',
      preferredMaxBytes: '512 KB'
    };

    this.configtxForm = {
      'Orderer': {
        'OrdererType': 'solo',
        'Addresses': [
          this.orderer.host + '.' + this.orderer.domain + ':7050'
        ],
        'BatchTimeout': '2s',
        'BatchSize': {
          'MaxMessageCount': 10,
          'AbsoluteMaxBytes': '98 MB',
          'PreferredMaxBytes': '512 KB'
        },
        'Kafka': {
          'Brokers': [
            '127.0.0.1:9092'
          ]
        },
        'Organizations': null
      },
      'Application': {
        'Organizations': null
      },
      'Organizations': [
        {
          'Name': this.orderer.org + 'MSP',
          'ID': this.orderer.org + 'MSP',
          'MSPDir': 'crypto-config/ordererOrganizations/' + this.orderer.domain + '/msp'
        },
        {
          'Name': 'Org1',
          'ID': 'Org1',
          'MSPDir': 'crypto-config/peerOrganizations/example.com/msp',
          'AnchorPeers': [
            {
              'Host': 'peer0.org1.example.com',
              'Port': 7051
            }
          ]
        }
      ],
      'Profiles': {
        'TwoOrgsOrdererGenesis': {
          'Orderer': {
            'OrdererType': 'solo',
            'Addresses': [
              this.orderer.host + '.' + this.orderer.domain + ':7050'
            ],
            'BatchTimeout': '2s',
            'BatchSize': {
              'MaxMessageCount': 10,
              'AbsoluteMaxBytes': '98 MB',
              'PreferredMaxBytes': '512 KB'
            },
            'Kafka': {
              'Brokers': [
                '127.0.0.1:9092'
              ]
            },
            'Organizations': [
              {
                'Name': this.orderer.org + 'MSP',
                'ID': this.orderer.org + 'MSP',
                'MSPDir': 'crypto-config/ordererOrganizations/' + this.orderer.domain + '/msp'
              }
            ]
          },
          'Consortiums': {
            'SampleConsortium': {
              'Organizations': [
                {
                  'Name': 'Org1',
                  'ID': 'Org1',
                  'MSPDir': 'crypto-config/peerOrganizations/org1.example.com/msp',
                  'AnchorPeers': [
                    {
                      'Host': 'peer0.org1.example.com',
                      'Port': 7051
                    }
                  ]
                }
              ]
            }
          }
        },
        'TwoOrgsChannel': {
          'Consortium': 'SampleConsortium',
          'Application': {
            'Organizations': [
              {
                'Name': 'Org1',
                'ID': 'Org1',
                'MSPDir': 'crypto-config/peerOrganizations/org1.example.com/msp',
                'AnchorPeers': [
                  {
                    'Host': 'peer0.org1.example.com',
                    'Port': 7051
                  }
                ]
              }
            ]
          }
        }
      }
    };
    this.state = {
      save: undefined,
      configTx: undefined,
      genesisBlock: undefined,
      channelTx: undefined,
      dockerCompose: undefined,
      peerUp: undefined
    };
    this.apiResponse = { status: true, message: 'Hit Save to start', path: null };
  }

  save(configtx) {
    const peers = this.ordererService.getPeers();
    const peerObjectArray: Array<Object> = [];
    const peerOrdererObjectArray: Array<Object> = [
      {
        'Name': this.orderer.org + 'MSP',
        'ID': this.orderer.org + 'MSP',
        'MSPDir': 'crypto-config/ordererOrganizations/' + this.orderer.domain + '/msp'
      }];
    peers.forEach((peer, index) => {
      peerObjectArray.push({
        'Name': peer.orgName,
        'ID': peer.orgName,
        'MSPDir': 'crypto-config/peerOrganizations/' + peer.orgName + '.' + peer.domain + '/msp',
        'AnchorPeers': [
          {
            'Host': 'peer0.' + peer.orgName + '.' + peer.domain,
            'Port': 7051
          }
        ]
      });
      peerOrdererObjectArray.push({
        'Name': peer.orgName,
        'ID': peer.orgName,
        'MSPDir': 'crypto-config/peerOrganizations/' + peer.orgName + '.' + peer.domain + '/msp',
        'AnchorPeers': [
          {
            'Host': 'peer0.' + peer.orgName + '.' + peer.domain,
            'Port': 7051
          }
        ]
      });
    });
    this.configtxForm = {
      'Orderer': {
        'OrdererType': configtx.ordererType,
        'Addresses': [
          this.orderer.host + '.' + this.orderer.domain + ':7050'
        ],
        'BatchTimeout': configtx.batchTimeout,
        'BatchSize': {
          'MaxMessageCount': configtx.maxMessageCount,
          'AbsoluteMaxBytes': configtx.absoluteMaxBytes,
          'PreferredMaxBytes': configtx.preferredMaxBytes
        },
        'Kafka': {
          'Brokers': [
            '127.0.0.1:9092'
          ]
        },
        'Organizations': null
      },
      'Application': {
        'Organizations': null
      },
      'Organizations': peerOrdererObjectArray,
      'Profiles': {
        'TwoOrgsOrdererGenesis': {
          'Orderer': {
            'OrdererType': 'solo',
            'Addresses': [
              this.orderer.host + '.' + this.orderer.domain + ':7050'
            ],
            'BatchTimeout': '2s',
            'BatchSize': {
              'MaxMessageCount': 10,
              'AbsoluteMaxBytes': '98 MB',
              'PreferredMaxBytes': '512 KB'
            },
            'Kafka': {
              'Brokers': [
                '127.0.0.1:9092'
              ]
            },
            'Organizations': [
              {
                'Name': this.orderer.org + 'MSP',
                'ID': this.orderer.org + 'MSP',
                'MSPDir': 'crypto-config/ordererOrganizations/' + this.orderer.domain + '/msp'
              }
            ]
          },
          'Consortiums': {
            'SampleConsortium': {
              'Organizations': peerObjectArray
            }
          }
        },
        'TwoOrgsChannel': {
          'Consortium': 'SampleConsortium',
          'Application': {
            'Organizations': peerObjectArray
          }
        }
      }
    };
    this.state = {
      save: RequestStatus.success,
      configTx: undefined,
      genesisBlock: undefined,
      channelTx: undefined,
      dockerCompose: undefined,
      peerUp: undefined
    };
    this.apiResponse = { 'status': true, 'message': 'Hit submit to start', path: null };
  }

  configTx() {
    this.ordererService.configTx(this.configtxForm).subscribe(data => {
      console.log(data);
      this.state.configTx = RequestStatus.success;
      this.state.genesisBlock = RequestStatus.pending;
      this.state.channelTx = RequestStatus.pending;
      this.state.dockerCompose = RequestStatus.pending;
      this.state.peerUp = RequestStatus.pending;
      this.apiResponse = { 'message': JSON.parse(data['_body'])['message'], 'status': true, path: JSON.parse(data['_body'])['path'] };
      this.genesisBlock();
    }, err => {
      console.error(err);
      this.state.configTx = RequestStatus.failure;
      this.apiResponse = { 'message': JSON.parse(err['_body'])['message'], 'status': false, path: null };
    });

  }

  genesisBlock() {
    this.ordererService.genesisBlock().subscribe(data => {
      console.log(data);
      this.state.genesisBlock = RequestStatus.success;
      this.apiResponse = { 'message': JSON.parse(data['_body'])['message'], 'status': true, path: JSON.parse(data['_body'])['path'] };
      this.channelTx();
    }, err => {
      console.error(err);
      this.state.genesisBlock = RequestStatus.failure;
      this.apiResponse = { 'message': JSON.parse(err['_body'])['message'], 'status': false, path: null };
    });
  }

  channelTx() {
    this.ordererService.channelTx().subscribe(data => {
      console.log(data);
      this.state.channelTx = RequestStatus.success;
      this.apiResponse = { 'message': JSON.parse(data['_body'])['message'], 'status': true, path: JSON.parse(data['_body'])['path'] };
      this.dockerCompose();
    }, err => {
      console.error(err);
      this.state.channelTx = RequestStatus.failure;
      this.apiResponse = { 'message': JSON.parse(err['_body'])['message'], 'status': false, path: null };
    });
  }

  // Anchor peer functionality not yet implemented
  // anchorPeer() {
  //   this.ordererService.anchorPeer().subscribe(data => {
  //     console.log(data);
  //     this.state.anchorPeer = RequestStatus.success;
  //     this.apiResponse = { 'message': JSON.parse(data['_body'])['message'], 'status': true, path: JSON.parse(data['_body'])['path'] };
  //     this.dockerCompose();
  //   }, err => {
  //     console.error(err);
  //     this.state.anchorPeer = RequestStatus.failure;
  //     this.apiResponse = { 'message': JSON.parse(err['_body'])['message'], 'status': false, path: null };
  //   });
  // }

  dockerCompose() {
    this.ordererService.dockerCompose().subscribe(data => {
      console.log(data);
      this.state.dockerCompose = RequestStatus.success;
      this.apiResponse = { 'message': JSON.parse(data['_body'])['message'], 'status': true, path: JSON.parse(data['_body'])['path'] };
      this.startPeer();
    }, err => {
      console.error(err);
      this.state.dockerCompose = RequestStatus.failure;
      this.apiResponse = { 'message': JSON.parse(err['_body'])['message'], 'status': false, path: null };
    });
  }

  startPeer() {
    this.ordererService.startPeer().subscribe(data => {
      console.log(data);
      this.state.peerUp = RequestStatus.success;
      this.apiResponse = { 'message': JSON.parse(data['_body'])['message'], 'status': true, path: JSON.parse(data['_body'])['path'] };
      // this.router.navigate(['/orderer', { outlets: { ordererSection: 'orderer-output' } }]);
    }, err => {
      console.error(err);
      this.state.peerUp = RequestStatus.failure;
      this.apiResponse = { 'message': JSON.parse(err['_body'])['message'], 'status': false, path: null };
    });
  }
}
