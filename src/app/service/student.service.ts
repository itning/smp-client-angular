import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../api';
import {StudentUser} from '../entity/StudentUser';
import {Page} from '../entity/page/Page';
import {Observable} from 'rxjs';
import {QueryPageSortParamBuilder} from '../http/QueryPageSortParamBuilder';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {
  }

  getAllStudentByPage(pagination: QueryPageSortParamBuilder): Observable<Page<StudentUser>> {
    return this.http.get<Page<StudentUser>>(`${API.users}${pagination.build()}`);
  }
}
