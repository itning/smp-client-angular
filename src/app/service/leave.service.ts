import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Leave} from '../entity/Leave';
import {Page} from '../entity/page/Page';
import {API} from '../api';
import {QueryPageSortParamBuilder} from '../http/QueryPageSortParamBuilder';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private http: HttpClient) {
  }

  getAllLeaveByPage(pagination: QueryPageSortParamBuilder): Observable<Page<Leave>> {
    return this.http.get<Page<Leave>>(API.leaves + pagination.build());
  }
}
