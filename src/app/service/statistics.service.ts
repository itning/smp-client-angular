import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HomeComing} from '../entity/statistics/HomeComing';
import {API} from '../api';
import {Observable} from 'rxjs';
import {Leave} from '../entity/statistics/Leave';
import {ClassComing} from '../entity/statistics/ClassComing';
import {AllCounselor} from '../entity/statistics/AllCounselor';
import {ApartmentStatistics} from '../entity/statistics/ApartmentStatistics';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) {
  }

  getHomeComingChart(date: string): Observable<HomeComing> {
    return this.http.get<HomeComing>(`${API.statistics_home_coming}?date=${date}`);
  }

  getLeaveChart(date: string): Observable<Leave> {
    return this.http.get<Leave>(`${API.statistics_leave}?date=${date}`);
  }

  getClassComingChart(date: string): Observable<ClassComing> {
    return this.http.get<ClassComing>(`${API.statistics_class_coming}?date=${date}`);
  }

  getAllCounselorChart(startDate: string, endDate: string): Observable<AllCounselor[]> {
    return this.http.get<AllCounselor[]>(`${API.statistics_all_counselor}?startDate=${startDate}&endDate=${endDate}`);
  }

  getApartmentChart(): Observable<ApartmentStatistics[]> {
    return this.http.get<ApartmentStatistics[]>(API.statistics_apartment);
  }
}
