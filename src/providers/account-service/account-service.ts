import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV } from '@environment';

/*
  Generated class for the AccountServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AccountServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AccountServiceProvider Provider');
  }


  get(){
    return this.http.get(ENV.API_ENDPOINT + "/api/account");
  }
}
