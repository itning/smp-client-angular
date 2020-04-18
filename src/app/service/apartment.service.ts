import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
}
