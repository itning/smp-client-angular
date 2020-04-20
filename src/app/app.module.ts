import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {SharedModule} from './module/shared/shared.module';
import {StudentModule} from './module/student/student.module';
import {httpInterceptorProviders} from './http';
import {NzMessageModule, NzNotificationServiceModule} from 'ng-zorro-antd';
import {LoginModule} from './module/login/login.module';
import {IndexModule} from './module/index/index.module';
import {NewStudentModule} from './module/new-student/new-student.module';
import {ApartmentModule} from './module/apartment/apartment.module';
import {LeaveModule} from './module/leave/leave.module';
import {LeaveCheckModule} from './module/leave-check/leave-check.module';
import {RoomModule} from './module/room/room.module';
import {StatisticsModule} from './module/statistics/statistics.module';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    StatisticsModule,
    RoomModule,
    LeaveCheckModule,
    LeaveModule,
    ApartmentModule,
    NewStudentModule,
    IndexModule,
    LoginModule,
    StudentModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzNotificationServiceModule,
    NzMessageModule
  ],
  providers: [{provide: NZ_I18N, useValue: zh_CN}, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
