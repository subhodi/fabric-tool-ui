import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.css']
})
export class TaskStatusComponent implements OnInit {

  @Input() status: string;
  RequestStatus = RequestStatus;
  constructor() {
  }

  ngOnInit() {
  }

}
enum RequestStatus {
  pending = 1,
  success,
  failure
}
