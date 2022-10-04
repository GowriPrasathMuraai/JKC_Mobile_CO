import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApproverPage } from './approver.page';
import { CustomerCardComponent } from './customer-card/customer-card.component';

const routes: Routes = [
  {
    path: '',
    component: ApproverPage,
    // children: [
    
    // ]
  },
  {
    path: 'customer-card',
    component: CustomerCardComponent
  },
  {
    path: '',
    redirectTo: '/menu/tabs/approver',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApproverPageRoutingModule {}
