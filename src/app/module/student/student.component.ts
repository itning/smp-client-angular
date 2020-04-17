import {Component, OnInit} from '@angular/core';
import {StudentService} from '../../service/student.service';
import {RestModel} from '../../entity/RestModel';
import {StudentUser} from '../../entity/StudentUser';
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  constructor(private studentService: StudentService,
              private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this.studentService.getAllStudentByPage().subscribe((data: RestModel<StudentUser>) => {
      console.log('组件接收数据');
      console.log(data);
    });
  }

  showNot() {
    this.notification.error('1', 'a');
  }
}
