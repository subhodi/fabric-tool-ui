import { Component, OnInit } from '@angular/core';

import { OrdererService } from '../../../services/orderer.service';

import { RequestStatus, APIResponse } from '../../../model/model.interface';

@Component({
  selector: 'app-orderer-service-form',
  templateUrl: './orderer-service-form.component.html',
  styleUrls: ['./orderer-service-form.component.css']
})
export class OrdererServiceFormComponent implements OnInit {
  configtxForm: Object;
  configtx: Object;
  StateStatus: any = {};
  apiResponse: APIResponse;
  requestStatus = RequestStatus;
  orderer: Orderer;
  constructor(private ordererService: OrdererService) {
    this.orderer = ordererService.getOrderer();
  }

  ngOnInit() {
    this.configtx = {
      ordererType: 'solo',
      maxMessageCount: 10,
      batchTimeout: '2s', absoluteMaxBytes: '98 MB',
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

              ]
            }
          }
        },
        'TwoOrgsChannel': {
          'Consortium': 'SampleConsortium',
          'Application': {
            'Organizations': [

            ]
          }
        }
      }
    };
    this.apiResponse = { 'status': true, 'message': 'Hit submit to start', path: null };
  }

  save(configtx) {
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
      'Organizations': [
        {
          'Name': this.orderer.org + 'MSP',
          'ID': this.orderer.org + 'MSP',
          'MSPDir': 'crypto-config/ordererOrganizations/' + this.orderer.domain + '/msp'
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

              ]
            }
          }
        },
        'TwoOrgsChannel': {
          'Consortium': 'SampleConsortium',
          'Application': {
            'Organizations': [

            ]
          }
        }
      }
    };
    this.StateStatus.submit = RequestStatus.success;
    this.StateStatus.cryptoConfigFile = RequestStatus.pending;
    this.StateStatus.cryptogen = RequestStatus.pending;
    this.apiResponse = { 'status': true, 'message': 'Hit submit to start', path: null };
  }

}

interface Orderer {
  org: string;
  domain: string;
  host: string;
}
