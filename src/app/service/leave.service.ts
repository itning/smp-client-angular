import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Leave} from '../entity/Leave';
import {Page} from '../entity/page/Page';
import {API} from '../api';
import {QueryPageSortParamBuilder} from '../http/QueryPageSortParamBuilder';
import {LeaveType} from '../entity/LeaveType';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private http: HttpClient) {
  }

  getAllLeaveByPage(pagination: QueryPageSortParamBuilder): Observable<Page<Leave>> {
    return this.http.get<Page<Leave>>(API.leaves + pagination.build());
  }

  searchLeaveByPage(search: LeaveSearch | null, pagination: QueryPageSortParamBuilder): Observable<Page<Leave>> {
    let query = `${pagination.build()}&key=${search.key}`;
    if (search) {
      if (search.effective.trim() !== '') {
        query += `&effective=${search.effective}`;
      }
      if (search.leaveType.trim() !== '') {
        query += `&leaveType=${search.leaveType}`;
      }
      if (search.time.startTime.trim() !== '' && search.time.endTime.trim() !== '') {
        query += `&startTime=${search.time.startTime}&endTime=${search.time.endTime}`;
      }
    }
    console.log(query);
    return this.http.get<Page<Leave>>(API.search.leaves + query);
  }
}

export interface LeaveSearch {
  key: string;
  time: { startTime: string, endTime: string };
  leaveType: LeaveType | '';
  effective: string;
}
