import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Placeholders } from '../enum/placeholders';
import { AppNavRouters } from '../helpers/router-path';
import { AuthService } from '../Services/auth.service';
import { StorageService } from '../Services/storage.service';
import { ToastService } from '../Services/toast.service';
import { TranslatetextService } from '../Services/translatetext.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  title = '';
  constructor( private readonly storageService: StorageService,
    private navController: NavController,  private _authService: AuthService,
    public toastService: ToastService, private translateTextService: TranslatetextService) { }

  ngOnInit() {
    this.title = 'Settings';
  }
  logout() {
    this.storageService.removeItem(Placeholders.USERNAME);
    this.storageService.removeItem(Placeholders.PASSWORD);
    this.storageService.removeItem(Placeholders.TOKEN);
    this.storageService.removeItem(Placeholders.USERID);
    this.storageService.removeItem(Placeholders.EMAIL_ADDRESS);
    this.storageService.removeItem(Placeholders.DISPLAY_NAME);
    this.storageService.removeItem(Placeholders.MANAGER_ID);
    this.storageService.removeItem(Placeholders.USERROLE);
    this.toastService.success(
      this.translateTextService.getTranslatedText(
        'TOASTER_MESSAGES.LOGGED_OUT_SUCCESS'
      ),
      1000,
      'success',
      'top'
    );
    this.navController.navigateRoot(AppNavRouters.SIGN_IN);
  }
}
