import {NgModule} from '@angular/core';
import {LeaveCheckComponent} from './component/leave-check/leave-check.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [LeaveCheckComponent],
  imports: [
    SharedModule
  ]
})
export class LeaveCheckModule {
}
