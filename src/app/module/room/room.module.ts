import {NgModule} from '@angular/core';
import {RoomComponent} from './component/room/room.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [RoomComponent],
  imports: [
    SharedModule
  ]
})
export class RoomModule {
}
