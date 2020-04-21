import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {API} from '../api';
import {Observable} from 'rxjs';
import {StudentRoomCheck} from '../entity/StudentRoomCheck';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) {
  }

  getCheckDateData(): Observable<string> {
    return this.http.get<string>(API.check_date);
  }

  getCountShouldRoomCheckData(date: string): Observable<{ t1: number, t2: number }> {
    return this.http.get<{ t1: number, t2: number }>(`${API.countShouldRoomCheck}?date=${date}`);
  }

  getCheckAllData(data: string): Observable<StudentRoomCheck[]> {
    return this.http.get<StudentRoomCheck[]>(`${API.check_all}?whereDay=${data}`);
  }

  getGPSRange(): Observable<number[][]> {
    return this.http.get<number[][]>(API.gps_range);
  }

  updateCheckDate(date: string): Observable<string> {
    const param = new HttpParams()
      .set('dateString', date);
    return this.http.post<string>(API.check_date, param);
  }

  exportCheckData(data: string) {
    this.http.get(API.export_room + data, {responseType: 'blob'}).subscribe((blob) => {
      const url = (window as any).URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.href = url;
      a.download = `${data} 学生寝室打卡信息.xlsx`;
      a.click();
      (window as any).URL.revokeObjectURL(url);
    });
  }
}
