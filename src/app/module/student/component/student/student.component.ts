import {Component, OnInit} from '@angular/core';
import {StudentService} from '../../../../service/student.service';
import {StudentUser} from '../../../../entity/StudentUser';
import {NzMessageService, NzTableQueryParams} from 'ng-zorro-antd';
import {QueryPageSortParamBuilder} from '../../../../http/QueryPageSortParamBuilder';
import {Page} from '../../../../entity/page/Page';

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
  isShowDetailModal = false;
  nowShowDetailStudentUser: StudentUser = null;
  queryPageSortParamBuilder = new QueryPageSortParamBuilder();

  constructor(private studentService: StudentService,
              private message: NzMessageService) {
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
    this.queryPageSortParamBuilder = new QueryPageSortParamBuilder()
      .page(params.pageIndex - 1)
      .size(params.pageSize)
      .sort(params.sort);
    if (this.needSearch()) {
      this.getSearchData(this.searchKey.trim(), this.queryPageSortParamBuilder);
    } else {
      this.getData(this.queryPageSortParamBuilder);
    }
  }

  showDetail(data: StudentUser) {
    this.nowShowDetailStudentUser = data;
    this.isShowDetailModal = true;
  }

  onModalCancel() {
    if (this.needSearch()) {
      this.getSearchData(this.searchKey.trim(), this.queryPageSortParamBuilder);
    } else {
      this.getData(this.queryPageSortParamBuilder);
    }
    this.isShowDetailModal = false;
  }

  confirmDelStudent() {
    if (this.nowShowDetailStudentUser) {
      this.studentService.delStudent(this.nowShowDetailStudentUser.id).subscribe(() => {
        this.message.success('删除成功');
        this.onModalCancel();
      });
    }
  }

  confirmResetStudentPassword() {
    if (this.nowShowDetailStudentUser) {
      this.studentService.resetStudentPassword(this.nowShowDetailStudentUser.studentId).subscribe(() => {
        this.message.success('重置成功');
      });
    }
  }
}
