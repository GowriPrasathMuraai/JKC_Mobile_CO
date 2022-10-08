import { Component, OnInit, ViewEncapsulation } from '@angular/core';

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'WallmaxX', weight: 1.0079,star : ''},
  {position: 2, name: 'Whitemax X', weight: 4.0026,star : ''},
  {position: 3, name: 'Gypsomax X', weight: 6.941,star : ''},
  {position: 4, name: 'Beryllium', weight: 9.0122,star : ''},
  {position: 5, name: 'RepairmanX', weight: 10.811,star : ''},
  {position: 6, name: 'Tilemax X', weight: 12.0107,star : ''},
  {position: 7, name: 'WoodmaxX', weight: 14.0067,star : ''},
  {position: 8, name: 'ShieldmacX', weight: 15.9994,star : ''}
];
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  star: any;
}
@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})



export class CustomerCardComponent implements OnInit {
  title: string;
  displayedColumns = [
    'name',
    'position',
    'weight',
    'star',
  ];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit() {
    this.title = 'Customer Name';
  }

}
