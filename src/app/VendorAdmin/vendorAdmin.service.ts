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
export class VendorAdminService {

  constructor(
    private http: HttpClient,
    private messengerService: MessengerService,
    private router: Router
  ) {}
  getVendorProducts(): Observable<any> {
    return this.http.get<any>(`${environment.productUrl}`);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/categories`);
  }

  createProducts(data): Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}/products`,data );
  }
}
