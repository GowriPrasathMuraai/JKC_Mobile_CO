import { Injectable } from '@angular/core';
import { TabDetails } from '../models/tabdetails.model';

@Injectable({
  providedIn: 'root',
})
export class TabDetailsService {
  getInvoiceDetailsTabs(): TabDetails[] {
    const invoiceDetailsTabs: TabDetails[] = [
      {
        path: 'all',
        title: 'TAB_DETAILS.ALL',
        active: false,
      },
      {
        path: 'open',
        title: 'TAB_DETAILS.OPEN',
        active: false,
      },
      {
        path: 'pending',
        title: 'TAB_DETAILS.PENDING',
        active: false,
      },
      {
        path: 'approved',
        title: 'TAB_DETAILS.APPROVED',
        active: false,
      },
    ];
    return invoiceDetailsTabs;
  }
}
