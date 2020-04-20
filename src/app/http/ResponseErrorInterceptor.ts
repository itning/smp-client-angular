import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {NzNotificationService} from 'ng-zorro-antd';
import {RestModel} from '../entity/RestModel';
import {SecurityService} from '../service/security.service';

/**
 * 响应错误处理
 */
@Injectable()
export class ResponseErrorInterceptor implements HttpInterceptor {

  constructor(private notification: NzNotificationService,
              private securityService: SecurityService) {
  }

  private handleError(notification: NzNotificationService, securityService: SecurityService) {
    return (error: HttpErrorResponse) => {
      if (error.error instanceof ErrorEvent) {
        // 发生客户端或网络错误。
        console.error('An error occurred:', error.error.message);
        notification.error('客户端错误：', error.error.message);
      } else {
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${JSON.stringify(error.error)}`);
        const errorMsg = (error.error as RestModel<string>).msg;
        notification.error('错误', errorMsg);
        if (error.status === 401) {
          securityService.route2Login();
        }
      }
      return EMPTY;
    };
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError(this.handleError(this.notification, this.securityService)),
      );
  }
}
