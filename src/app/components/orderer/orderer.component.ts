import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orderer',
  templateUrl: './orderer.component.html',
  styleUrls: ['./orderer.component.css']
})
export class OrdererComponent implements OnInit {
  title = 'Multi-Step Wizard';
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['/orderer', { outlets: { ordererSection: 'cryptogen' } }]);
  }

}
