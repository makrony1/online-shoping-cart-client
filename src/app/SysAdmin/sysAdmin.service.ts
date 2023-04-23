import { Injectable } from '@angular/core';
import { CurrentUser } from '../shared/models/user';
import { Observable, of, ReplaySubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessengerService } from '../shared/service/messenger.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SysAdminService {

  constructor(
    private http: HttpClient,
    private messengerService: MessengerService,
    private router: Router
  ) {}

  getCategories(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/categories`);
  }

  createCategory(data): Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}/categories`,data );
  }

  updateCategory(data): Observable<any>{
    return this.http.put<any>(`${environment.baseUrl}/categories/${data.id}`,data );
  }

  getVendors(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/vendors`);
  }

  createVendor(data): Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}/vendors`,data );
  }

  updateVendor(data): Observable<any>{
    return this.http.put<any>(`${environment.baseUrl}/vendors/${data.id}`,data );
  }
}
