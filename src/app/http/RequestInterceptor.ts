import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {TokenService} from '../service/token.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private token: TokenService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`request ${req.url}`);
    const token: string | null = this.token.getJwtTokenString();
    let headers: Headers = {Accept: 'application/json'};
    if (token !== null) {
      headers = {Authorization: token, ...headers};
    }
    const authReq = req.clone({setHeaders: headers});
    return next.handle(authReq);
  }
}

interface Headers {
  [name: string]: string;
}
