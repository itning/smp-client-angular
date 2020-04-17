import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {TokenService} from '../service/token.service';

/**
 * <p>拦截器
 * <p>加入请求头
 */
@Injectable()
export class RequestHeaderInterceptor implements HttpInterceptor {

  constructor(private token: TokenService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
