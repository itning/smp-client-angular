import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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
    return this.http.get<Page<StudentUser>>(API.users + pagination.build());
  }

  searchAllStudentByPage(key: string, pagination: QueryPageSortParamBuilder): Observable<Page<StudentUser>> {
    return this.http.get<Page<StudentUser>>(API.search.users + key + pagination.build());
  }

  updateStudentInfo(update: StudentUserInfo): Observable<void> {
    return this.http.patch<void>(API.update_user, update);
  }

  resetStudentPassword(studentId: string): Observable<void> {
    const param = new HttpParams()
      .set('studentId', studentId);
    return this.http.post<void>(API.reset_password, param);
  }

  delStudent(id: string): Observable<void> {
    return this.http.delete<void>(API.del_user + id);
  }
}

export interface StudentUserInfo {
  id: string;

  [key: string]: string;
}
