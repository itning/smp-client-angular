import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {TokenService} from '../service/token.service';
import {catchError} from 'rxjs/operators';
import {NzNotificationService} from 'ng-zorro-antd';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private token: TokenService, private notification: NzNotificationService) {
  }

  private handleError(error: HttpErrorResponse) {
    this.notification.error('错误：', 'error');
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`response ${req.url}`);

    return next.handle(req)
      .pipe(
        catchError(this.handleError),
        /*tap(
          event => {
            status = '';
            if (event instanceof HttpResponse) {
              console.log(event.status);
            }
          },
          (error: HttpErrorResponse) => {
            console.log((error.error as RestModel<string>).msg);
          }
        )*/
      );
  }
}
