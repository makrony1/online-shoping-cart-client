import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../shared/models/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(`${environment.productUrl}`);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.productUrl}/${id}`);
  }

  reserveProduct(token: string, body: any, id: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `${token}`);

    return this.http.post<any>(`${environment.reservationsUrl}/${id}`, body, {headers});
  }
}
