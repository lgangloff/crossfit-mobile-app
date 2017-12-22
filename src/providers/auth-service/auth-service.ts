import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  logged = false;

  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }

  login(username: string, password: string){
    let data = new FormData();
    data.set("j_username",  username);
    data.set("j_password", password);
    data.set("remember-me", "true");
    data.set("submit", "Login");
    
    return this.http.post("api/authentication", data);
  }

  logout(){
    return this.http.post("api/logout", {});
  }
}
