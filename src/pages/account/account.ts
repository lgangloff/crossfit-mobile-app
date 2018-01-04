import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PrincipalServiceProvider } from '../../providers/principal-service/principal-service';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  account: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public principal: PrincipalServiceProvider) {
    this.principal.identity(false).subscribe(
      res=>{
        this.account = res;
      }
    )
  }

}
