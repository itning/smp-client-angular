import {NgModule} from '@angular/core';
import {NewStudentComponent} from './component/new-student/new-student.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [NewStudentComponent],
  imports: [
    SharedModule
  ]
})
export class NewStudentModule { }
