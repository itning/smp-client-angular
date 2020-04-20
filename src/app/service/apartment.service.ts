import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Apartment} from '../entity/Apartment';
import {API} from '../api';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  constructor(private http: HttpClient) {
  }

  getAllApartment(): Observable<Apartment[]> {
    return this.http.get<Apartment[]>(API.apartment);
  }

  addApartment(name: string): Observable<Apartment> {
    const param = new HttpParams()
      .set('apartmentName', name.trim());
    return this.http.post<Apartment>(API.add_apartment, param);
  }

  delApartment(id: string): Observable<void> {
    return this.http.delete<void>(API.del_apartment + id);
  }

  updateApartmentName(id: string, name: string): Observable<void> {
    return this.http.patch<void>(API.update_apartment, {id, name});
  }
}
