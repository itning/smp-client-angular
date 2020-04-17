import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {RequestInterceptor} from './RequestInterceptor';
import {ResponseInterceptor} from './ResponseInterceptor';

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true}
];
