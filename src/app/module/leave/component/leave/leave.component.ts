import {Component, OnInit} from '@angular/core';
import {LeaveService} from '../../../../service/leave.service';
import {QueryPageSortParamBuilder} from '../../../../http/QueryPageSortParamBuilder';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {
  searchKey = '';
  isAllowCondition = false;

  constructor(private leaveService: LeaveService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(pagination: QueryPageSortParamBuilder = new QueryPageSortParamBuilder()) {
    this.leaveService.getAllLeaveByPage(pagination).subscribe((leaves) => {
      console.log(leaves);
    });
  }

  onSearch() {
  }
}
