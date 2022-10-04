import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountVerificationComponent } from './account-verification/account-verification.component';
import { OtpSigninComponent } from './otp-signin/otp-signin.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [ 
  {
    path: 'welcomepage',
    component: WelcomePageComponent,
  },
  {
    path: '',
    component: SignInComponent,
  },
  {
    path: 'account-verification',
    component: AccountVerificationComponent,
  },
  {
    path: 'otp-signin',
    component: OtpSigninComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
