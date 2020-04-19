import {NgModule} from '@angular/core';

import {IndexRoutingModule} from './index-routing.module';
import {IndexComponent} from './component/index/index.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    SharedModule,
    IndexRoutingModule
  ]
})
export class IndexModule { }
