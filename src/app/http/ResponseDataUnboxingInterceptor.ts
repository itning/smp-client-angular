import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {RestModel} from '../entity/RestModel';

/**
 * <p>响应拆箱拦截转换
 * <p>从RestModel转换为data:any
 */
@Injectable()
export class ResponseDataUnboxingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.status !== 204) {
          // 获取响应
          // noinspection TypeScriptValidateTypes
          const httpResponse: HttpResponse<RestModel<any>> = (event as HttpResponse<RestModel<any>>);
          // 获取RestModel中data
          const data: any = httpResponse.body.data;
          // clone and return
          return httpResponse.clone<any>({
            body: data
          });
        }
        return event;
      })
    );
  }
}
