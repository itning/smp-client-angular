import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../api';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {
  }

  getAllStudentByPage() {
    return this.http.get(API.users);
  }
}
