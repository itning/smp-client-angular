import {Component, OnInit} from '@angular/core';
import {StudentService} from '../../service/student.service';
import {StudentUser} from '../../entity/StudentUser';
import {NzTableQueryParams} from 'ng-zorro-antd';
import {QueryPageSortParamBuilder} from '../../http/QueryPageSortParamBuilder';
import {Page} from '../../entity/page/Page';

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
  searchKey = '';

  constructor(private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(pagination: QueryPageSortParamBuilder = new QueryPageSortParamBuilder()) {
    this.loading = true;
    this.studentService.getAllStudentByPage(pagination).subscribe(this.bind2View,
      () => {
      },
      () => {
        this.loading = false;
      });
  }

  getSearchData(key: string, pagination: QueryPageSortParamBuilder = new QueryPageSortParamBuilder()) {
    this.loading = true;
    this.studentService.searchAllStudentByPage(key, pagination).subscribe(this.bind2View,
      () => {
      },
      () => {
        this.loading = false;
      });
  }

  bind2View = (data: Page<StudentUser>): void => {
    this.total = data.totalElements;
    this.pageSize = data.size;
    this.pageIndex = data.number + 1;
    this.listOfStudentUser = data.content;
  }

  needSearch(): boolean {
    return this.searchKey && this.searchKey.trim() !== '';
  }

  onSearch() {
    if (this.needSearch()) {
      this.getSearchData(this.searchKey.trim());
    } else {
      this.getData();
    }
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    const queryPageSortParamBuilder = new QueryPageSortParamBuilder()
      .page(params.pageIndex - 1)
      .size(params.pageSize)
      .sort(params.sort);
    if (this.needSearch()) {
      this.getSearchData(this.searchKey.trim(), queryPageSortParamBuilder);
    } else {
      this.getData(queryPageSortParamBuilder);
    }
  }
}
