import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { PrincipalServiceProvider } from '../../providers/principal-service/principal-service';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  box = {
    name: "Crossfit Nancy"
  };
  message: string;

  username: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public principal: PrincipalServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  login(){
    this.message = null;
    this.authService.login(this.username, this.password).subscribe(
      succes=>{},
      error =>{
        this.doAfterTryLogin(error);
      },
      () => {
        this.doAfterTryLogin();
      }
    );
  }

  doAfterTryLogin(error?){
    this.principal.identity(true).subscribe(res=>{
      if (this.principal.isAuthenticated()){
        this.navCtrl.setRoot(TabsPage);
      }
      else{
        this.message = "Mauvais identifiant ou mot de passe: " + JSON.stringify(error);
      }
    });
  }
}
