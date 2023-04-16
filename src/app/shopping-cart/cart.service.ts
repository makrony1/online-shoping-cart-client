import { Injectable } from '@angular/core';
import { CartItem, CheckOutResponse } from '../shared/models/cart';
import { MessengerService } from '../shared/service/messenger.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart_item_key: "cart_item_local";

  constructor(private http: HttpClient) {}

  getReservation(userId: string): Observable<any> {
    return this.http.get<any>(`${environment.reservationsUrl}/getUserReservation/${userId}`);
  }

  payReservation(reservationId: string, userId: string): Observable<any> {
    return this.http.post<any>(`${environment.reservationsUrl}/pay`, {
      userId: userId,
      reservationId: reservationId
    });
  }
  getCartItem(): any{
    let ci = localStorage.getItem(this.cart_item_key);
    
    let r = JSON.parse(ci);
    return r==null? []: r;
  }

  removeCartItem(item: CartItem): any{
    let ci = localStorage.getItem(this.cart_item_key);
    let result = [];
    result = JSON.parse(ci);

    if(result!= null){
      let index = result.findIndex(r=>r.id==item.id);
      if(index>-1){
        result.splice(index,1);
        localStorage.setItem(this.cart_item_key, JSON.stringify(result))

      }
    }
  }

}
