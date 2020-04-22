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
  private readonly LAST_URL_BEFORE_TO_LOGIN_KEY = 'last_url_before_to_login_key';

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

  afterLogin() {
    const routeTo = window.localStorage.getItem(this.LAST_URL_BEFORE_TO_LOGIN_KEY);
    if (routeTo) {
      this.router.navigate([routeTo]).catch((error) => {
        console.error(error);
        window.localStorage.removeItem(this.LAST_URL_BEFORE_TO_LOGIN_KEY);
        this.router.navigate(['/']).catch((e) => console.error(e));
      });
    } else {
      this.router.navigate(['/']).catch((e) => console.error(e));
    }
  }

  route2Login(): void {
    window.localStorage.setItem(this.LAST_URL_BEFORE_TO_LOGIN_KEY, this.router.url);
    this.tokenService.clearJwtTokenString();
    this.router.navigate(['/login']).catch((error) => console.error(error));
  }
}
