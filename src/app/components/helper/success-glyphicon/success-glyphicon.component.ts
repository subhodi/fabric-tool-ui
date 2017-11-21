import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-success-glyphicon',
  templateUrl: './success-glyphicon.component.html',
  styleUrls: ['./success-glyphicon.component.css']
})
export class SuccessGlyphiconComponent implements OnInit {
  @Input() status: string;

  constructor() {
  }

  ngOnInit() {
    console.log(this.status);
  }

}
