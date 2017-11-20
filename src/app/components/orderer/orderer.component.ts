import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-orderer',
  templateUrl: './orderer.component.html',
  styleUrls: ['./orderer.component.css']
})
export class OrdererComponent implements OnInit {
  title = 'Multi-Step Wizard';
  constructor() { }

  ngOnInit() {
  }

}
