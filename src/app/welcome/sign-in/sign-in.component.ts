import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AppNavRouters } from 'src/app/helpers/router-path';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;
  constructor( public formBuilder: FormBuilder, private router: Router,
    private navController: NavController) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  performLoginForm() {
    this.navController.navigateRoot(AppNavRouters.ACCOUNT_TAB);
  }
}
