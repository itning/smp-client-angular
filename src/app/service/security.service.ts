import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {API} from '../api';
import {tap} from 'rxjs/operators';
import {TokenService} from './token.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Base64} from 'js-base64';
import {LoginUser} from '../entity/LoginUser';
import {NzMessageService} from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private readonly LAST_URL_BEFORE_TO_LOGIN_KEY = 'last_url_before_to_login_key';
  private readonly COUNSELOR_ROLE_ID = '3';
  private loginUser: LoginUser = null;

  constructor(private http: HttpClient,
              private tokenService: TokenService,
              private router: Router,
              private message: NzMessageService) {
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

  changePassword(newPassword: string): Observable<void> {
    const param = new HttpParams()
      .set('newPassword', newPassword);
    return this.http.post<void>(API.change_password, param);
  }

  logout() {
    this.tokenService.clearJwtTokenString();
    this.router.navigate(['/login']).catch((error) => console.error(error));
  }

  isCounselorLogin(): boolean {
    const userInfo = this.getUserInfo();
    return userInfo && (userInfo.role.id === this.COUNSELOR_ROLE_ID);
  }

  afterLogin() {
    this.loginUser = null;
    if (!this.isCounselorLogin()) {
      this.message.error('请使用辅导员账户进行登录');
      console.warn(`login failed and user info: ${JSON.stringify(this.getUserInfo())}`);
      return;
    }
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
    if (this.router.url !== '/login') {
      window.localStorage.setItem(this.LAST_URL_BEFORE_TO_LOGIN_KEY, this.router.url);
    }
    this.logout();
  }

  getUserInfo(): LoginUser | null {
    if (this.loginUser) {
      return this.loginUser;
    } else {
      try {
        const token = this.tokenService.getJwtTokenString();
        if (!token) {
          return null;
        }
        this.loginUser = JSON.parse(JSON.parse(
          Base64.decode(token.split('.')[1])
        ).loginUser);
        return this.loginUser;
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  }
}
