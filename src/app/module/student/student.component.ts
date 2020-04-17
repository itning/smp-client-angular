import {Component, OnInit} from '@angular/core';
import {StudentService} from '../../service/student.service';
import {StudentUser} from '../../entity/StudentUser';
import {NzTableQueryParams} from 'ng-zorro-antd';
import {QueryPageSortParamBuilder} from '../../http/QueryPageSortParamBuilder';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  total = 0;
  pageSizeOptions = [10, 30, 50, 70, 100];
  listOfStudentUser: StudentUser[] = [];
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  constructor(private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(pagination: QueryPageSortParamBuilder = new QueryPageSortParamBuilder()) {
    this.loading = true;
    this.studentService.getAllStudentByPage(pagination).subscribe((data) => {
      this.total = data.totalElements;
      this.pageSize = data.size;
      this.pageIndex = data.number + 1;
      this.listOfStudentUser = data.content;
      this.loading = false;
    });
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    this.getData(
      new QueryPageSortParamBuilder()
        .page(params.pageIndex - 1)
        .size(params.pageSize)
        .sort(params.sort)
    );
  }
}
