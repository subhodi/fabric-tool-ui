import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-orderer-output',
  templateUrl: './orderer-output.component.html',
  styleUrls: ['./orderer-output.component.css']
})
export class OrdererOutputComponent implements OnInit {
  public pieChartLabels: string[] = ['Used', 'Free'];
  public pieChartData: number[] = [70, 30];
  public pieChartColor: any[] = [{ backgroundColor: ['#009688', '#546E7A'] }];
  public pieChartType = 'pie';
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
