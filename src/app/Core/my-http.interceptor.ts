import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let myheaders: any = { token: localStorage.getItem('etoken') };
    if (localStorage.getItem('etoken') != null) {
      request = request.clone({
        setHeaders: myheaders,
      });
    }
    return next.handle(request);
  }
}
