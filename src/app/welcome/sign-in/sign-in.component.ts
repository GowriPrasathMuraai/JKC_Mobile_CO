import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AppNavRouters } from 'src/app/helpers/router-path';
import { AuthenticationDetails } from 'src/app/models/master';
import { AuthService } from 'src/app/Services/auth.service';
import { ToastService } from 'src/app/Services/toast.service';
import { TranslatetextService } from 'src/app/Services/translatetext.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;
  constructor( public formBuilder: FormBuilder, private router: Router,
    private navController: NavController,  private _authService: AuthService,
    public toastService: ToastService, private translateTextService: TranslatetextService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  LoginClicked(): void {
    if (this.loginForm.valid) {
      this._authService.login(this.loginForm.get('userName').value, this.loginForm.get('password').value).subscribe(
        (data) => {
          const dat = data as AuthenticationDetails;
          if (data.isChangePasswordRequired === 'Yes') {
            this.OpenChangePasswordDialog(dat);
          } else {
            this.saveUserDetails(dat);
          }
        },
        (err) => {
          console.error(err);
           this.toastService.warning(
            this.translateTextService.getTranslatedText(
              'TOASTER_MESSAGE.LOGGED_IN_SUCCESS'
            ),
            1000,
            'success-internet-toaster',
            'top'
          );
        }
      );
      // this._router.navigate(['dashboard']);
      // this.notificationSnackBarComponent.openSnackBar('Logged in successfully', SnackBarStatus.success);
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        const abstractControl = this.loginForm.get(key);
        abstractControl.markAsDirty();
      });
    }
  }

  
  saveUserDetails(data: AuthenticationDetails): void {
    localStorage.setItem('authorizationData', JSON.stringify(data));
    this.toastService.success(
      this.translateTextService.getTranslatedText(
        'TOASTER_MESSAGE.LOGGED_IN_SUCCESS'
      ),
      1000,
      'success-internet-toaster',
      'top'
    );
    // this.router.navigate(['pages/nextlogin']);
  }

  OpenChangePasswordDialog(data: AuthenticationDetails): void {
    // const dialogConfig: MatDialogConfig = {
    //   data: null,
    //   panelClass: 'change-password-dialog'
    // };
    // const dialogRef = this.dialog.open(ChangePasswordDialogComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe(
    //   result => {
    //     if (result) {
    //       const changePassword = result as ChangePassword;
    //       changePassword.UserID = data.UserID;
    //       changePassword.UserName = data.UserName;
    //       this._authService.ChangePassword(changePassword).subscribe(
    //         (res) => {
             
    //           this.notificationSnackBarComponent.openSnackBar('Password updated successfully, please log with new password', SnackBarStatus.success);
    //           this.router.navigate(['/auth/login']);
    //         }, (err) => {
    //           this.notificationSnackBarComponent.openSnackBar(err instanceof Object ? 'Something went wrong' : err, SnackBarStatus.danger);
    //           this.router.navigate(['/auth/login']);
    //           console.error(err);
    //         }
    //       );
    //     }
    //   }
    // );
  }
}
