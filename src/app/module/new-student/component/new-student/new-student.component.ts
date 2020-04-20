import {Component, OnInit} from '@angular/core';
import {NzNotificationService, UploadChangeParam, UploadFile} from 'ng-zorro-antd';
import {API} from '../../../../api';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss']
})
export class NewStudentComponent implements OnInit {
  uploadPath = API.upload_user_file;
  stepCurrent: 0 | 1 | 2 = 0;
  resultInfo = '';
  resultError: string[] = [];

  constructor(private notification: NzNotificationService) {
  }

  ngOnInit(): void {
  }

  beforeUpload = (file: UploadFile, fileList: UploadFile[]): boolean => {
    // tslint:disable-next-line
    const exName = file.name.slice((file.name.lastIndexOf('.') - 1 >>> 0) + 2);
    if (exName === 'xls' || exName === 'xlsx') {
      return true;
    } else {
      this.notification.error('文件不正确，请重新选择', `文件${file.name}不是正确的Excel文件，支持的扩展名：xls或xlsx`);
      return false;
    }
  }

  handleChange(param: UploadChangeParam) {
    if (param.type === 'success') {
      if (param.file.response.error) {
        this.resultError = param.file.response.error;
        this.stepCurrent = 1;
      } else {
        this.resultInfo = `新增学生数量：${param.file.response.now} 总共学生数量：${param.file.response.total}`;
        this.stepCurrent = 2;
      }
    }
  }
}
