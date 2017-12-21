import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { PrincipalServiceProvider } from '../providers/principal-service/principal-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public principal: PrincipalServiceProvider) {
        
    platform.ready().then(() => {

      this.principal.identity(true).subscribe(
        res=>{

          statusBar.styleDefault();
          splashScreen.hide();

          if (!this.principal.isAuthenticated()){
            this.rootPage = LoginPage;
          }
          this.rootPage = TabsPage;
        }
      ); 
    });
  }
}
