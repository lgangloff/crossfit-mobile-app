import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  account: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public principal: PrincipalServiceProvider) {
    this.account.firstName = "Loïc";
    this.account.lastName = "Gangloff";
  }

}
