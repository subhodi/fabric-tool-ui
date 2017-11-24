import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-orderer-output',
  templateUrl: './orderer-output.component.html',
  styleUrls: ['./orderer-output.component.css']
})
export class OrdererOutputComponent implements OnInit {
  public loadLabels: string[] = ['Used', 'Free'];
  public loadData: number[] = [70, 30];
  public loadColor: any[] = [{ backgroundColor: ['#009688', '#546E7A'] }];
  public loadType = 'pie';

  public memoryLabels: string[] = ['Used', 'Free'];
  public memoryData: number[] = [60, 40];
  public memoryColor: any[] = [{ backgroundColor: ['#009688', '#546E7A'] }];
  public memoryType = 'pie';

  constructor() {
  }

  ngOnInit() {
  }

}

interface Peer {
  containerId: string;
  name: string;
  created: string;
  status: string;
  action: string;
}
