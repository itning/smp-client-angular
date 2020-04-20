import {NgModule} from '@angular/core';
import {LoginComponent} from './component/login/login.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule
  ]
})
export class LoginModule {
}
