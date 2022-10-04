import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';
import { AlertController, IonRouterOutlet, Platform } from '@ionic/angular';
import { Subject } from 'rxjs';
import { Placeholders } from './enum/placeholders';
import { StorageService } from './Services/storage.service';
import { ToastService } from './Services/toast.service';
import { TranslatetextService } from './Services/translatetext.service';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy{

  private onDestroy = new Subject<boolean>();
  currentURL: string;
  previousUrl = '';
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList < IonRouterOutlet > ;
  constructor(
    private readonly storageService: StorageService,
    private platform: Platform,
    public router: Router,
    private alertController: AlertController,
    private translateTextService: TranslatetextService,
    private network: Network,
    public toastService: ToastService
  ) {
    this.checkNetworkConnection();
  }

  async ngOnInit(): Promise<void> {
    // this.platform.ready().then(() => {
    //   // console.log('Width: ' + this.platform.width());
    //   // console.log('Height: ' + this.platform.height());
    // });
    await this.storageService.initializeStorage();
    this.currentRouterURL();
  }
  async currentRouterURL() {
    this.storageService.set(Placeholders.PREVIOUS_URL, this.router.url);
    this.router.events.subscribe(
      (event: NavigationEnd) => {
        if(event instanceof NavigationStart) {
          this.previousUrl = this.currentURL;
          this.currentURL = event;
          this.backButtonEvent();
        }
      }
    );
  }

  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(0, () => {
        if ((this.router.url.includes('/account')) && (this.previousUrl.includes('/menu/tabs/home'))) {
          this.router.navigate(['/menu/tabs/home']);
        }
        // else if ((this.router.url.includes('/invoice-details')) && (this.previousUrl.includes('/pending/pending-invoices'))) {
        //   this.router.navigate(['/menu/tabs/pending/pending-invoices']);
        // }
        else if ((this.router.url === '') || (this.router.url === '/menu/tabs/approver'))  {
          this.presentAlertConfirm();
        }
        else if (this.router.url === '/menu/tabs/account') {
          this.router.navigate(['/menu/tabs/approver']);
        }
        else {
          this.router.navigate([this.previousUrl]);
        } 
    });
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      message:  this.translateTextService.getTranslatedText('BUTTON.EXIT_APP'),
      buttons: [{
        text:  this.translateTextService.getTranslatedText('BUTTON.CANCEL'),
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {}
      }, {
        text:  this.translateTextService.getTranslatedText('BUTTON.CLOSE_APP'),
        handler: () => {
          this.storageService.removeItem(Placeholders.USERID);
          this.storageService.removeItem(Placeholders.TICKET);
          navigator['app'].exitApp();
          this.router.navigateByUrl('sign-in');
        }
      }]
    });
    await alert.present();
  }
  ngOnDestroy(): void {
    
  }
  
  async checkNetworkConnection() {
    this.network
      .onDisconnect()
      .pipe(takeUntil(this.onDestroy))
      .subscribe(async () => {
        this.toastService.warning(
          this.translateTextService.getTranslatedText(
            'TOASTER_MESSAGE.INTERNET_DISCONNECTED'
          ),
          2000,
          'no-internet-toaster',
          'warning-outline',
          'Cancel'
        );
      });
    this.network
      .onConnect()
      .pipe(takeUntil(this.onDestroy))
      .subscribe(async () => {
        this.toastService.success(
          this.translateTextService.getTranslatedText(
            'TOASTER_MESSAGE.INTERNET_CONNECTED'
          ),
          1000,
          'success-internet-toaster',
          'top'
        );
      }
    );
  }

}
