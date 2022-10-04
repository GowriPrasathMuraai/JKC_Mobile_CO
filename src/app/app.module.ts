import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { HTTP } from '@ionic-native/http/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Placeholders } from './enum/placeholders';
import { Drivers } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AccountPageModule } from './account/account.module';
import { NgApexchartsModule } from 'ng-apexcharts';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/json/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: Placeholders.DB,
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
    }),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
    AccountPageModule,
    NgApexchartsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Network],
  bootstrap: [AppComponent],
  exports: [TranslateModule,AppRoutingModule]
})
export class AppModule {}
