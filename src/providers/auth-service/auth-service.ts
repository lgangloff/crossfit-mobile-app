import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV } from '@environment';

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
    
    return this.http.post(ENV.API_ENDPOINT + "/api/authentication", data);
  }

  logout(){
    return this.http.post(ENV.API_ENDPOINT + "/api/logout", {});
  }
}
