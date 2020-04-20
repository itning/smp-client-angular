import {NgModule} from '@angular/core';
import {NewStudentComponent} from './component/new-student/new-student.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [NewStudentComponent],
  imports: [
    SharedModule,
    RouterModule
  ]
})
export class NewStudentModule {
}
