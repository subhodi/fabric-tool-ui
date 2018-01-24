import { Component, OnInit, Input } from '@angular/core';

import { RequestStatus } from '../../../model/model.interface';

@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.css']
})
export class TaskStatusComponent implements OnInit {

  @Input() status: RequestStatus;
  RequestStatus = RequestStatus;
  constructor() {
  }

  ngOnInit() {
  }

}
