import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { AccountVerificationComponent } from './account-verification/account-verification.component';
import { SharedModule } from '../shared/shared.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { IonicModule } from '@ionic/angular';
import { OtpSigninComponent } from './otp-signin/otp-signin.component';

@NgModule({
  declarations: [WelcomePageComponent,AccountVerificationComponent,SignInComponent,
    OtpSigninComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    IonicModule,
  ]
})
export class WelcomeModule { }
