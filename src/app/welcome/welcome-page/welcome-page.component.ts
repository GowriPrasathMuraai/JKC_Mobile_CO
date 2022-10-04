import { Component, OnInit } from '@angular/core';
import { TranslatetextService } from 'src/app/Services/translatetext.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  title: string;
  constructor( private translateTextService: TranslatetextService) { }

  ngOnInit() {
    this.title = 'Welcomepage';
  }

}
