import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  NzAutocompleteModule,
  NzButtonModule,
  NzFormModule,
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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StudentInfoComponent} from '../../component/student-info/student-info.component';
import {InputEditComponent} from '../../component/input-edit/input-edit.component';

@NgModule({
  declarations: [SexPipe, StudentInfoComponent, InputEditComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
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
    NzSelectModule,
    NzFormModule
  ],
  exports: [
    SexPipe,
    StudentInfoComponent,
    InputEditComponent,
    FormsModule,
    ReactiveFormsModule,
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
    NzSelectModule,
    NzFormModule
  ]
})
export class SharedModule {
}
