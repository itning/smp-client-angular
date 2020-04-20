import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  NzAutocompleteModule,
  NzButtonModule,
  NzDatePickerModule,
  NzFormModule,
  NzIconModule,
  NzInputModule,
  NzLayoutModule,
  NzMenuModule,
  NzModalModule,
  NzPopconfirmModule,
  NzResultModule,
  NzSelectModule,
  NzSwitchModule,
  NzTableModule,
  NzTypographyModule,
  NzUploadModule
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
    NzFormModule,
    NzUploadModule,
    NzResultModule,
    NzTypographyModule,
    NzSwitchModule,
    NzDatePickerModule
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
    NzFormModule,
    NzUploadModule,
    NzResultModule,
    NzTypographyModule,
    NzSwitchModule,
    NzDatePickerModule
  ]
})
export class SharedModule {
}
