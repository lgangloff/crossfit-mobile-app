import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpXsrfTokenExtractor } from '@angular/common/http';

@Injectable()
export class CsrfInterceptorProvider implements HttpInterceptor {

  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headerName = 'X-CSRF-TOKEN';
    let token = this.tokenExtractor.getToken() as string;
    console.log("teeeeee:" + token);
    token = "plop";
    const dupreq = req.clone({ headers: req.headers.set(headerName, token) });
    return next.handle(dupreq);
  }
}