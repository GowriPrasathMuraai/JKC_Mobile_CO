import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sims-apps-finger-print-success',
  templateUrl: './finger-print-status.component.html',
  styleUrls: ['./finger-print-status.component.scss'],
})
export class FingerPrintStatusComponent implements OnInit {
  userName = 'Stephen';
  email = 'stephen@gmail.com';
  status: 'succcess' | 'error';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.status = this.route.snapshot.paramMap.get('status') as
      | 'succcess'
      | 'error';
  }
}
