import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerCardComponent implements OnInit {
  title: string;
  constructor() { }

  ngOnInit() {
    this.title = 'Customer Name';
  }

}
