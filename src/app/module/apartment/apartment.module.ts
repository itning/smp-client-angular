import {NgModule} from '@angular/core';
import {ApartmentComponent} from './component/apartment/apartment.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [ApartmentComponent],
  imports: [
    SharedModule
  ]
})
export class ApartmentModule {
}
