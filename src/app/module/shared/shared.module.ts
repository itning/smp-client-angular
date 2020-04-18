import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  NzAutocompleteModule,
  NzButtonModule,
  NzIconModule,
  NzInputModule,
  NzLayoutModule,
  NzMenuModule,
  NzModalModule,
  NzPopconfirmModule,
  NzSelectModule,
  NzTableModule
} from 'ng-zorro-antd';
import {SexPipe} from '../../pipe/sex.pipe';
import {FormsModule} from '@angular/forms';
import {StudentInfoComponent} from '../../component/student-info/student-info.component';
import {InputEditComponent} from '../../component/input-edit/input-edit.component';

@NgModule({
  declarations: [SexPipe, StudentInfoComponent, InputEditComponent],
  imports: [
    FormsModule,
    CommonModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    NzModalModule,
    NzPopconfirmModule,
    NzAutocompleteModule,
    NzSelectModule
  ],
  exports: [
    SexPipe,
    StudentInfoComponent,
    InputEditComponent,
    FormsModule,
    CommonModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    NzModalModule,
    NzPopconfirmModule,
    NzAutocompleteModule,
    NzSelectModule
  ]
})
export class SharedModule {
}
