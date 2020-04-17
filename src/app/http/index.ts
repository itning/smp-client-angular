import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {RequestHeaderInterceptor} from './RequestHeaderInterceptor';
import {ResponseErrorInterceptor} from './ResponseErrorInterceptor';
import {Provider} from '@angular/core';
import {ResponseDataUnboxingInterceptor} from './ResponseDataUnboxingInterceptor';

export const httpInterceptorProviders: Provider[] = [
  {provide: HTTP_INTERCEPTORS, useClass: RequestHeaderInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: ResponseErrorInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: ResponseDataUnboxingInterceptor, multi: true}
];
