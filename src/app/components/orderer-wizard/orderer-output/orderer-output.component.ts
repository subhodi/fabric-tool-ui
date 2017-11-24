import { Component, OnInit } from '@angular/core';
import { OrdererService } from '../../../services/orderer.service';
import { setInterval } from 'timers';

@Component({
  selector: 'app-orderer-output',
  templateUrl: './orderer-output.component.html',
  styleUrls: ['./orderer-output.component.css']
})
export class OrdererOutputComponent implements OnInit {

  public loadLabels: string[] = ['Used', 'Free'];
  public loadData: number[] = [70, 30];
  public loadColor: any[] = [{ backgroundColor: ['#00BFA5', '#546E7A'] }];
  public loadType = 'pie';

  public memoryLabels: string[] = ['Used', 'Free'];
  public memoryData: number[] = [60, 40];
  public memoryColor: any[] = [{ backgroundColor: ['#00BFA5', '#546E7A'] }];
  public memoryType = 'pie';

  public totalMemory: number;
  public availableMemory: number;
  public load: number[] = [0, 0, 0];


  constructor(private ordererService: OrdererService) {
    this.ordererService.getSystemStats().subscribe(data => {
      const response = JSON.parse(data['_body']);
      this.memoryData = [response.totalMem - response.availableMem, response.availableMem];
      this.loadData = [response.avgLoad[0], 4 - response.avgLoad[0]]; // get Number of core to Avg value: replace 4
      this.load = response.avgLoad;
      this.totalMemory = response.totalMem;
      this.availableMemory = response.availableMem;
    }, err => {
      alert(err.toString());
    });
  }

  ngOnInit() {
  }

}

