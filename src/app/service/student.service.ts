import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../api';
import {StudentUser} from '../entity/StudentUser';
import {Page} from '../entity/page/Page';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {
  }

  getAllStudentByPage(pagination = {page: 0, size: 10}) {
    return this.http.get<Page<StudentUser>>(`${API.users}?page=${pagination.page}&size=${pagination.size}`);
  }
}
