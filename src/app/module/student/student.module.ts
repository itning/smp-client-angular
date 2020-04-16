import {NgModule} from '@angular/core';
import {StudentComponent} from './student.component';
import {NzButtonModule, NzIconModule, NzInputModule} from 'ng-zorro-antd';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    StudentComponent,
  ],
  imports: [
    SharedModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule
  ]
})
export class StudentModule {
}
