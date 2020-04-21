import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {RoomService} from '../../service/room.service';
import {StudentRoomCheck} from '../../entity/StudentRoomCheck';
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-room-pic-water-fall',
  templateUrl: './room-pic-water-fall.component.html',
  styleUrls: ['./room-pic-water-fall.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomPicWaterFallComponent implements OnInit {
  @ViewChild('notification', {static: false})
  template: TemplateRef<{}>;
  studentRoomChecks: StudentRoomCheck[] = [];

  constructor(private roomService: RoomService,
              private notificationService: NzNotificationService) {
  }

  ngOnInit(): void {
    this.studentRoomChecks = this.roomService.getStudentRoomCheckArray();
  }

  itemClick(data: StudentRoomCheck) {
    this.notificationService.template(this.template, {nzData: data, nzPauseOnHover: true});
  }
}
