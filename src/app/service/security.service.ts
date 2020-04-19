import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {API} from '../api';
import {tap} from 'rxjs/operators';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient,
              private tokenService: TokenService) {
  }

  login(username: string, password: string) {
    const param = new HttpParams()
      .set('username', username)
      .set('password', password);
    this.http.post<string>(API.login, param)
      .pipe(
        tap((token) => this.tokenService.setJwtTokenString(token))
      );
  }
}
