import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AppNavRouters } from 'src/app/helpers/router-path';

@Component({
  selector: 'app-otp-signin',
  templateUrl: './otp-signin.component.html',
  styleUrls: ['./otp-signin.component.scss'],
})
export class OtpSigninComponent implements OnInit {


  otpform: FormGroup;
  constructor( public formBuilder: FormBuilder, private router: Router,
    private navController: NavController) { }

  ngOnInit() {
    this.otpform = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(1)]],
    });
  }
  performotpform() {
    this.navController.navigateRoot(AppNavRouters.ACCOUNT_TAB);
  }
}
