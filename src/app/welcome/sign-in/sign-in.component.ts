import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Placeholders } from 'src/app/enum/placeholders';
import { AppNavRouters } from 'src/app/helpers/router-path';
import { AuthenticationDetails } from 'src/app/models/master';
import { AuthService } from 'src/app/Services/auth.service';
import { StorageService } from 'src/app/Services/storage.service';
import { ToastService } from 'src/app/Services/toast.service';
import { TranslatetextService } from 'src/app/Services/translatetext.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;
  passwordType = 'password';
  passwordIcon = 'eye-off';
  constructor( public formBuilder: FormBuilder, private router: Router,
    private navController: NavController,  private _authService: AuthService,
    public toastService: ToastService, private translateTextService: TranslatetextService,
    private readonly storageService: StorageService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  LoginClicked(): void {
    if (this.loginForm.valid) {
      this._authService.login(this.loginForm.get('username').value, this.loginForm.get('password').value).subscribe(
        (data) => {
          console.log(data);
          this.storeCredentialsInLocalStorage(data);
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
              'TOASTER_MESSAGES.ERROR_OCCURED'
            ),
            1000,
            'warning',
            'top'
          );
        }
      );
    
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
        'TOASTER_MESSAGES.LOGGED_IN_SUCCESS'
      ),
      1000,
      'success',
      'top'
    );
    this.navController.navigateRoot(AppNavRouters.ACCOUNT);
  }

  async OpenChangePasswordDialog(data: AuthenticationDetails): Promise<void> {
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
    // const modal = await this.modalCtrl.create({
    //   component: ChangePasswordDialogComponent,
    //   componentProps: {
    //     passwordType: this.passwordType
    //   },
    //   cssClass: 'detail-modal',
    //   backdropDismiss: true,
    // });
    // modal.onDidDismiss().then(() => {
    //   const loader = false;
    // }).catch((err: any) => {
    //   console.log(err);
    // });
    // return await modal.present();
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  get errorControl() {
    return this.loginForm.controls;
  }
  private storeCredentialsInLocalStorage(data) {
    this.storageService.set( Placeholders.USERNAME, data.UserName);
    this.storageService.set( Placeholders.PASSWORD, this.loginForm.value.password);
    this.storageService.set( Placeholders.USERROLE, data.UserRole);
    this.storageService.set( Placeholders.USERID, data.UserID);
    this.storageService.set( Placeholders.TOKEN, data.Token);
    this.storageService.set( Placeholders.MANAGER_ID, data.ManagerID);
    this.storageService.set( Placeholders.EMAIL_ADDRESS, data.EmailAddress);
    this.storageService.set( Placeholders.DISPLAY_NAME, data.DisplayName);
  }
}
