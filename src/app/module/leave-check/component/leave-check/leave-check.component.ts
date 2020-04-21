import {Component, OnInit} from '@angular/core';
import {LeaveService} from '../../../../service/leave.service';
import {QueryPageSortParamBuilder} from '../../../../http/QueryPageSortParamBuilder';
import {Leave} from '../../../../entity/Leave';
import {NzMessageService, NzTableQueryParams} from 'ng-zorro-antd';
import {Page} from '../../../../entity/page/Page';

@Component({
  selector: 'app-leave-check',
  templateUrl: './leave-check.component.html',
  styleUrls: ['./leave-check.component.scss']
})
export class LeaveCheckComponent implements OnInit {
  searchKey = '';
  expandSet = new Set<string>();
  listOfData: Leave[] = [];
  total = 0;
  pageSizeOptions = [10, 30, 50, 70, 100];
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  queryPageSortParamBuilder = new QueryPageSortParamBuilder();

  constructor(private leaveService: LeaveService,
              private message: NzMessageService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  bind2View = (data: Page<Leave>): void => {
    this.total = data.totalElements;
    this.pageSize = data.size;
    this.pageIndex = data.number + 1;
    this.listOfData = data.content;
  }

  getData(pagination: QueryPageSortParamBuilder = new QueryPageSortParamBuilder()) {
    this.loading = true;
    this.leaveService.getLeaveCheckByPage(pagination).subscribe(this.bind2View, () => {
    }, () => {
      this.loading = false;
    });
  }

  needSearch(): boolean {
    return this.searchKey && this.searchKey.trim() !== '';
  }

  getSearchData(key: string, pagination: QueryPageSortParamBuilder = new QueryPageSortParamBuilder()) {
    this.loading = true;
    this.leaveService.searchLeaveCheckByPage(key, pagination).subscribe(this.bind2View, () => {
    }, () => {
      this.loading = false;
    });
  }

  onSearch() {
    if (this.pageIndex !== 1) {
      this.pageIndex = 1;
      return;
    }
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

  onExpandChange(id: string, checked: boolean) {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  leaveCheck(id: string, status: boolean) {
    console.log(`id ${id} status: ${status}`);
    this.leaveService.checkLeaveStatus(id, status).subscribe(() => {
      this.message.success('审批成功');
      this.getData();
    });
  }
}
