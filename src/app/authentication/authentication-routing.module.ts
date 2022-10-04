import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FingerPrintEnableComponent } from './components/finger-print-enable/finger-print-enable.component';
import { FingerPrintStatusComponent } from './components/finger-print-status/finger-print-status.component';

const routes: Routes = [
  {
    path: '',
    component: FingerPrintEnableComponent,
  },
  {
    path: 'finger-print/:status',
    component: FingerPrintStatusComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationPageRoutingModule {}
