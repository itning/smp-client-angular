import {NgModule} from '@angular/core';
import {LeaveComponent} from './component/leave/leave.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [LeaveComponent],
  imports: [
    SharedModule
  ]
})
export class LeaveModule { }
