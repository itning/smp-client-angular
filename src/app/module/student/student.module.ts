import {NgModule} from '@angular/core';
import {StudentComponent} from './student.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    StudentComponent,
  ],
  imports: [
    SharedModule
  ]
})
export class StudentModule {
}
