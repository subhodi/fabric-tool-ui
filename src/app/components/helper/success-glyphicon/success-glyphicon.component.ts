import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-success-glyphicon',
  templateUrl: './success-glyphicon.component.html',
  styleUrls: ['./success-glyphicon.component.css']
})
export class SuccessGlyphiconComponent implements OnInit {
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

