import {NgModule} from '@angular/core';
import {StatisticsComponent} from './component/statistics/statistics.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [StatisticsComponent],
  imports: [
    SharedModule
  ]
})
export class StatisticsModule { }
