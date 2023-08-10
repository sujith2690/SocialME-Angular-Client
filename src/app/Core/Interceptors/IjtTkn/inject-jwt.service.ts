import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InjectJwtService implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('Token');
    console.log(token,'-------token middle');
    
    const authRequest = request.clone({
      setHeaders: {
        authorization: `Bearer ${token}`,
      },
    });

    return next.handle(authRequest);
  }
}
