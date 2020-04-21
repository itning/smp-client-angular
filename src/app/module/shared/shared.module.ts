import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  NzAutocompleteModule,
  NzButtonModule,
  NzCommentModule,
  NzDatePickerModule,
  NzFormModule,
  NzIconModule,
  NzInputModule,
  NzLayoutModule,
  NzListModule,
  NzMenuModule,
  NzModalModule,
  NzPopconfirmModule,
  NzPopoverModule,
  NzResultModule,
  NzSelectModule,
  NzStatisticModule,
  NzSwitchModule,
  NzTableModule,
  NzTimePickerModule,
  NzToolTipModule,
  NzTypographyModule,
  NzUploadModule
} from 'ng-zorro-antd';
import {SexPipe} from '../../pipe/sex.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StudentInfoComponent} from '../../component/student-info/student-info.component';
import {InputEditComponent} from '../../component/input-edit/input-edit.component';
import {CommentComponent} from '../../component/comment/comment.component';
import {LeaveTypePipe} from '../../pipe/leave-type.pipe';

@NgModule({
  declarations: [SexPipe, LeaveTypePipe, StudentInfoComponent, InputEditComponent, CommentComponent],
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
    NzDatePickerModule,
    NzCommentModule,
    NzListModule,
    NzStatisticModule,
    NzPopoverModule,
    NzToolTipModule,
    NzTimePickerModule
  ],
  exports: [
    CommentComponent,
    SexPipe,
    LeaveTypePipe,
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
    NzDatePickerModule,
    NzCommentModule,
    NzListModule,
    NzStatisticModule,
    NzPopoverModule,
    NzToolTipModule,
    NzTimePickerModule
  ]
})
export class SharedModule {
}
