import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItem } from '../../shared/models/cart';
import { ProductService } from '../../product/product.service';
import { Router } from '@angular/router';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { LoggerService } from '../../shared/service/logger.service';
import {ReservationItem} from "../../shared/models/reservation";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  reservations: [];
  reservationTotal: number;

  constructor(
    private service: CartService,
    private router: Router,
    private logger: LoggerService,
    public toast: ToastComponent
  ) {}

  ngOnInit(): void {
   this.load();
  }

  load(): void {
    this.reservations = this.service.getCartItem();
  }

  remove(item: CartItem) {
    this.service.removeCartItem(item);
    this.load();
  }

  checkout() {
    alert("checkout")
  }
}
