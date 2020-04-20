import {Pipe, PipeTransform} from '@angular/core';
import {LeaveType} from '../entity/LeaveType';

@Pipe({
  name: 'leaveType'
})
export class LeaveTypePipe implements PipeTransform {

  transform(value: LeaveType): string {
    switch (value) {
      case LeaveType.ALL_LEAVE:
        return '课假+寝室假';
      case LeaveType.CLASS_LEAVE:
        return '课假';
      case LeaveType.ROOM_LEAVE:
        return '寝室假';
    }
  }
}
