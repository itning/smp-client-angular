import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Leave} from '../entity/Leave';
import {Page} from '../entity/page/Page';
import {API} from '../api';
import {QueryPageSortParamBuilder} from '../http/QueryPageSortParamBuilder';
import {LeaveType} from '../entity/LeaveType';
import {LeaveReason} from '../entity/LeaveReason';

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

  getLeaveCheckByPage(pagination: QueryPageSortParamBuilder): Observable<Page<Leave>> {
    return this.http.get<Page<Leave>>(API.leaves_check + pagination.build());
  }

  searchLeaveCheckByPage(key: string, pagination: QueryPageSortParamBuilder): Observable<Page<Leave>> {
    return this.http.get<Page<Leave>>(`${API.search.leaves_check}${pagination.build()}&key=${key}`);
  }

  checkLeaveStatus(id: string, status: boolean): Observable<void> {
    const param = new HttpParams()
      .set('leaveId', id)
      .set('status', status.toString());
    return this.http.post<void>(API.leave_status, param);
  }

  newComment(leaveId: string, value: string): Observable<LeaveReason> {
    const param = new HttpParams()
      .set('leaveId', leaveId)
      .set('comment', value);
    return this.http.post<LeaveReason>(API.leave_add_comment, param);
  }
}

export interface LeaveSearch {
  key: string;
  time: { startTime: string, endTime: string };
  leaveType: LeaveType | '';
  effective: string;
}
