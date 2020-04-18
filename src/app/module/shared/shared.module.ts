import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzButtonModule, NzIconModule, NzInputModule, NzLayoutModule, NzMenuModule, NzTableModule} from 'ng-zorro-antd';
import {SexPipe} from '../../pipe/sex.pipe';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [SexPipe],
  exports: [
    FormsModule,
    CommonModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    SexPipe
  ]
})
export class SharedModule {
}
