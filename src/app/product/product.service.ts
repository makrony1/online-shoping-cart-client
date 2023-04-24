import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../shared/models/product';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cart_item_key: "cart_item_local";
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/products/activeProducts`);
  }

  getAllProducts(): Observable<any> {
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

  addToCart(cartItem): any{
    var ci = localStorage.getItem(this.cart_item_key);
    let cartItems=[];
    if(ci!= null){
      cartItems= JSON.parse(ci);
      cartItems.push(cartItem);
      
    }else{
      cartItems.push(cartItem);
    }

    localStorage.setItem(this.cart_item_key, JSON.stringify(cartItems));

    return cartItems;
  }

  activateProduct(id):any{
    return this.http.put(`${environment.baseUrl}/products/activateProduct/${id}`, null);
  }

  deactivateProduct(id):any{
    return this.http.put(`${environment.baseUrl}/products/deactivateProduct/${id}`, null);
  }

}
