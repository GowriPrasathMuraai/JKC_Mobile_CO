import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApproverPageRoutingModule } from './approver-routing.module';

import { ApproverPage } from './approver.page';
import { CustomerInsightsComponent } from './customer-insights/customer-insights.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { CustomerCardComponent } from './customer-card/customer-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApproverPageRoutingModule,
    NgApexchartsModule,
    TranslateModule,
    SharedModule
  ],
  declarations: [ApproverPage, CustomerInsightsComponent, CustomerCardComponent]
})
export class ApproverPageModule {}
