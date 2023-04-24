import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../../shared/models/product';
import { MessengerService } from '../../shared/service/messenger.service';
import { CartService } from '../../shopping-cart/cart.service';
import { CartItem } from '../../shared/models/cart';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { LoggerService } from '../../shared/service/logger.service';
import {AccountService} from "../../account/account.service";

@Component({
  selector: 'app-product-list-item-details',
  templateUrl: './product-list-item-details.component.html',
})
export class ProductListItemDetailsComponent implements OnInit {
  product: Product = null;
  quantity = 1;

  selectedVariantSize: string;

  isLoading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: ProductService,
    private accountService: AccountService,
    private cartService: CartService,
    private loggerService: LoggerService,
    public toast: ToastComponent
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getById(id);
  }

  hidebutton(product):boolean{
    if(product.quantity > 0 && this.quantity > 0){
      return true;
    }else{
      return false;
    }
  }
  getImage(item):string{
    if(item.image == null || item.image== undefined){
      return 'https://image-us.samsung.com/us/smartphones/galaxy-s22/images/gallery/R0-Green/FLRC-214-R0-Green-01-PDP-GALLERY-1600x1200.jpg?$product-details-jpg$';
    }

    if(item.image.length >10){
      return item.image;
    }

    return 'https://image-us.samsung.com/us/smartphones/galaxy-s22/images/gallery/R0-Green/FLRC-214-R0-Green-01-PDP-GALLERY-1600x1200.jpg?$product-details-jpg$';
  }
  getById(id: string): void {
    this.service.getProductById(id).subscribe(
      (data) => {
        this.product = data;
        
      },
      (error) => {
        this.loggerService.logError(
          'ProductListItemDetailsComponent',
          error.error.toString()
        );
        this.toast.setMessage('Product not found', 'danger', 3000);
        this.router.navigate(['/product']);
      },
      () => (this.isLoading = false)
    );
  }

  handleAddToCart(product: Product): void {
    console.log(product)
    const cartItem: CartItem = {
      id: Math.floor(Math.random() * 1000000),
      productId: product.id,
      productPrice: product.sellingPrice,
      quantity: this.quantity,
      productName: product.name
    };
    
    this.service.addToCart(cartItem);
    this.toast.setMessage(
      `Products is added to cart. Please go to cart for checkout !`,
      'warning',
      3000
    );
  }
}
