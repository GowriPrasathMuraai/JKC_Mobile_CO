import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthenticationPageRoutingModule } from './authentication-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FingerPrintEnableComponent } from './components/finger-print-enable/finger-print-enable.component';
import { FingerPrintStatusComponent } from './components/finger-print-status/finger-print-status.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthenticationPageRoutingModule,
    TranslateModule,
  ],
  declarations: [FingerPrintEnableComponent, FingerPrintStatusComponent],
})
export class AuthenticationPageModule {}
