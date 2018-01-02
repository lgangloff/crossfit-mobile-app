import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';


import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { LoginPage } from '../pages/login/login';
import { PrincipalServiceProvider } from '../providers/principal-service/principal-service';
import { AccountServiceProvider } from '../providers/account-service/account-service';
import { AccountPage } from '../pages/account/account';
import { CalendarPage } from '../pages/calendar/calendar';
import { BookingServiceProvider } from '../providers/booking-service/booking-service';
import { PlanningServiceProvider } from '../providers/planning-service/planning-service';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    MyApp,
    AccountPage,
    CalendarPage,
    HomePage,
    TabsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'CSRF-TOKEN',
      headerName: 'X-CSRF-TOKEN',
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccountPage,
    CalendarPage,
    HomePage,
    TabsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    PrincipalServiceProvider,
    AccountServiceProvider,
    BookingServiceProvider,
    PlanningServiceProvider,
    { provide: LOCALE_ID, useValue: 'fr' }
  ]
})
export class AppModule {
}
