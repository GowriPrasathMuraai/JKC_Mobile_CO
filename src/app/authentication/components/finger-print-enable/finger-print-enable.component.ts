import { Component, OnInit } from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { NavController } from '@ionic/angular';
import { Placeholders } from 'src/app/enum/placeholders';
import { AppNavRouters } from 'src/app/helpers/router-path';
import { StorageService } from 'src/app/Services/storage.service';
import { ToastService } from 'src/app/Services/toast.service';
import { TranslatetextService } from 'src/app/Services/translatetext.service';
@Component({
  selector: 'sims-apps-finger-print-enable',
  templateUrl: './finger-print-enable.component.html',
  styleUrls: ['./finger-print-enable.component.scss'],
})
export class FingerPrintEnableComponent implements OnInit {
  userName : string;

  constructor(
    private navController: NavController,
    private storageService: StorageService,
    private translateTextService: TranslatetextService,
    public toastService: ToastService,
  ) {}
  async ngOnInit() {
    this.userName = await this.storageService.get(Placeholders.USERNAME);
  }
  onFingerprint(): void {
    this.storageService.set('isFingerPrintEnabled', 'Yes');
    // this.navController.navigateRoot(AppNavRouters.MENU);
    this.checkFingerPrintStatus();
  }
  checkFingerPrintStatus() {
    FingerprintAIO.isAvailable().then((result) => {
      if (result) {
        FingerprintAIO.show({
          title: this.translateTextService.getTranslatedText(
            'FINGER_PRINT.TITLE'
          ),
          subtitle: this.translateTextService.getTranslatedText(
            'FINGER_PRINT.SUB_TITLE'
          ),
          cancelButtonTitle: this.translateTextService.getTranslatedText('BUTTON.CANCEL_FINGER_PRINT'),
          disableBackup: false,
          fallbackButtonTitle: 'Use Pin',
        })
          .then((fingerPrintResult) => {
            if (fingerPrintResult === 'biometric_success') {
              this.toastService.success(
                this.translateTextService.getTranslatedText(
                  'TOASTER_MESSAGE.FINGER_PRINT_ENABLED'
                ),
                1000,
                'invoice-approve',
                'top'
              );
              this.navController.navigateRoot(AppNavRouters.MENU);
            }
          })
          .catch((error: Error) => {
            if(error.message === 'BIOMETRIC_DISMISSED') {
              this.checkFingerPrintStatus();
            } 
          });
      } 
    });
  }
  onSkip(): void {
    // this.storageService.set('isFingerPrintEnabled', 'No');
    this.navController.navigateRoot(AppNavRouters.MENU);
  }
}
