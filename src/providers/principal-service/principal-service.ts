import { Injectable } from '@angular/core';
import { AccountServiceProvider } from '../account-service/account-service';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class PrincipalServiceProvider {

  private userIdentity: any;
  private authenticated = false;
  private authenticationState = new Subject<any>();

  constructor(public accountService: AccountServiceProvider) {
    console.log('Hello PrincipalServiceProvider Provider');
  }


  hasAnyAuthority(authorities: string[]): Observable<boolean> {
    return this.identity().map(res=>{
          if (res && res.authorities){
                for (let i = 0; i < authorities.length; i++) {
                  if (res.authorities.indexOf(authorities[i]) !== -1) {
                      return true;
                  }
              }
          }
          return false;
      });
  }

  hasAuthority(authority: string): Observable<boolean> {

      return this.identity().map(res=>{
          return res && res.authorities && res.authorities.indexOf(authority) !== -1;
      });
  }

  identity(force?: boolean): Observable<any>{
      if (force === true) {
          this.userIdentity = undefined;
      }

      // check and see if we have retrieved the userIdentity data from the server.
      // if we have, reuse it by immediately resolving
      if (this.userIdentity) {
          this.authenticationState.next(this.userIdentity);
      }

      // retrieve the userIdentity data from the server, update the identity object, and then resolve.
      this.accountService.get().subscribe(
          user=>{
              if (user) {
                  this.userIdentity = user;
                  this.authenticated = true;
              } else {
                  this.userIdentity = null;
                  this.authenticated = false;
              }
              this.authenticationState.next(this.userIdentity);
          },

          error=>{
              this.userIdentity = null;
              this.authenticated = false;
              this.authenticationState.next(this.userIdentity);
          }
      );
      return this.authenticationState;
  }

  isAuthenticated(): boolean {
      return this.authenticated;
  }

  getAuthenticationState(): Observable<any> {
      return this.authenticationState.asObservable();
  }
}
