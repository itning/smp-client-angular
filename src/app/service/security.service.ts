import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {API} from '../api';
import {tap} from 'rxjs/operators';
import {TokenService} from './token.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient,
              private tokenService: TokenService,
              private router: Router) {
  }

  login(username: string, password: string): Observable<string> {
    const param = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http.post<string>(API.login, param)
      .pipe(
        tap((token) => this.tokenService.setJwtTokenString(token))
      );
  }

  route2Login(): void {
    this.tokenService.clearJwtTokenString();
    this.router.navigate(['/login']).catch((error) => console.error(error));
  }
}
