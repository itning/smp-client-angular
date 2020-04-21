import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './component/index/index.component';
import {StudentComponent} from '../student/component/student/student.component';
import {NewStudentComponent} from '../new-student/component/new-student/new-student.component';
import {ApartmentComponent} from '../apartment/component/apartment/apartment.component';
import {LeaveComponent} from '../leave/component/leave/leave.component';
import {LeaveCheckComponent} from '../leave-check/component/leave-check/leave-check.component';
import {RoomComponent} from '../room/component/room/room.component';
import {StatisticsComponent} from '../statistics/component/statistics/statistics.component';
import {RoomPicWaterFallComponent} from '../../component/room-pic-water-fall/room-pic-water-fall.component';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {path: '', redirectTo: 'student', pathMatch: 'full'},
      {path: 'student', component: StudentComponent},
      {path: 'new_student', component: NewStudentComponent},
      {path: 'apartment', component: ApartmentComponent},
      {path: 'leave', component: LeaveComponent},
      {path: 'leave_check', component: LeaveCheckComponent},
      {path: 'room', component: RoomComponent},
      {path: 'statistics', component: StatisticsComponent},
      {path: 'room_pic_view', component: RoomPicWaterFallComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule {
}
