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
  private static IS_SHOW_NOTIFICATION_NOW = false;

  constructor(private notification: NzNotificationService,
              private securityService: SecurityService) {
  }

  private showErrorNotificationOnceOnView(title: string, content: string, id: string) {
    if (ResponseErrorInterceptor.IS_SHOW_NOTIFICATION_NOW) {
      return;
    } else {
      this.notification.error(title, content, {nzKey: id})
        .onClose.subscribe(() => ResponseErrorInterceptor.IS_SHOW_NOTIFICATION_NOW = false);
    }
  }

  private handleError(securityService: SecurityService) {
    return (error: HttpErrorResponse) => {
      if (error.error instanceof ErrorEvent) {
        // 发生客户端或网络错误。
        console.error('An error occurred:', error.error.message);
        this.showErrorNotificationOnceOnView('客户端错误：', error.error.message, 'client');
      } else {
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${JSON.stringify(error.error)}`);
        if (error.status === 0) {
          this.showErrorNotificationOnceOnView('网络错误：', '请检查网络连接后再试', 'no-net');
        } else {
          const errorMsg = (error.error as RestModel<string>).msg;
          this.showErrorNotificationOnceOnView('错误：', errorMsg, 'backend');
          if (error.status === 401) {
            securityService.route2Login();
          }
        }
      }
      return EMPTY;
    };
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError(this.handleError(this.securityService)),
      );
  }
}
