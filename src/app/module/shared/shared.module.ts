import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzButtonModule, NzIconModule, NzInputModule, NzLayoutModule, NzMenuModule} from 'ng-zorro-antd';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule
  ]
})
export class SharedModule {
}
