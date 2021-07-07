import { LoginService } from 'src/app/services/login/login.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginservice: LoginService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Add the jwt token (localStorage) request
    let authReq = req;
    console.log("req ",authReq);

    const token = this.loginservice.getToken();
    console.log("inside interceptor");

    if (token != null) {
      authReq = authReq.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders=[{
  provide:HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi:true,
}]

