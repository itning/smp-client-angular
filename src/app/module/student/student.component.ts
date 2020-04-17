import {Component, OnInit} from '@angular/core';
import {StudentService} from '../../service/student.service';
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
    this.studentService.getAllStudentByPage().subscribe((data) => {
      console.log('组件接收数据');
      console.log(data);
    });
  }
}
