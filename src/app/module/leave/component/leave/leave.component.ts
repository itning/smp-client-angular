import {Component, OnInit} from '@angular/core';
import {LeaveSearch, LeaveService} from '../../../../service/leave.service';
import {QueryPageSortParamBuilder} from '../../../../http/QueryPageSortParamBuilder';
import {Leave} from '../../../../entity/Leave';
import {NzTableQueryParams} from 'ng-zorro-antd';
import {Page} from '../../../../entity/page/Page';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {
  isAllowCondition = false;
  expandSet = new Set<string>();
  listOfData: Leave[] = [];
  total = 0;
  pageSizeOptions = [10, 30, 50, 70, 100];
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  search: LeaveSearch = {effective: '', leaveType: '', time: {endTime: '', startTime: ''}, key: ''};
  dateRange: Date[] = [];
  datePipe = new DatePipe('zh-Hans');

  constructor(private leaveService: LeaveService) {
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
    this.leaveService.getAllLeaveByPage(pagination).subscribe(this.bind2View,
      () => {
      },
      () => {
        this.loading = false;
      });
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    const queryPageSortParamBuilder = new QueryPageSortParamBuilder()
      .page(params.pageIndex - 1)
      .size(params.pageSize)
      .sort(params.sort);
    if (!this.isAllowCondition && (!this.search.key || this.search.key === '')) {
      this.getData(queryPageSortParamBuilder);
    } else {
      this.loading = true;
      this.leaveService.searchLeaveByPage(this.search, queryPageSortParamBuilder).subscribe(this.bind2View, () => {
      }, () => {
        this.loading = false;
      });
    }
  }

  onSearch() {
    if (!this.isAllowCondition && (!this.search.key || this.search.key === '')) {
      this.getData();
      return;
    }
    if (this.isAllowCondition) {
      if (this.dateRange.length === 2) {
        this.search.time.startTime = this.datePipe.transform(this.dateRange[0], 'yyyy-MM-dd');
        this.search.time.endTime = this.datePipe.transform(this.dateRange[1], 'yyyy-MM-dd');
      } else {
        this.search.time.startTime = '';
        this.search.time.endTime = '';
      }
      this.loading = true;
      this.leaveService.searchLeaveByPage(this.search, new QueryPageSortParamBuilder()).subscribe(this.bind2View, () => {
      }, () => {
        this.loading = false;
      });
    } else {
      this.search = {effective: '', leaveType: '', time: {endTime: '', startTime: ''}, key: this.search.key};
      this.loading = true;
      this.leaveService.searchLeaveByPage(this.search, new QueryPageSortParamBuilder()).subscribe(this.bind2View, () => {
      }, () => {
        this.loading = false;
      });
    }
  }

  onExpandChange(id: string, checked: boolean) {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }
}
