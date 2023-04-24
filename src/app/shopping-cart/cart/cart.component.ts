import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItem, ShippingAddress, CardInfo } from '../../shared/models/cart';
import { ProductService } from '../../product/product.service';
import { Router } from '@angular/router';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { LoggerService } from '../../shared/service/logger.service';
import {ReservationItem} from "../../shared/models/reservation";
import { Observable } from 'rxjs';
import { CurrentUser } from 'src/app/shared/models/user';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  reservations: [];
  invoice: [];
  reservationTotal: number;
  isCheckoutDone:boolean= false;
  shippingAddress: ShippingAddress;
  cardInfo:CardInfo;
  currentUser$: Observable<CurrentUser>;
  isLogedIn=false;
  useremai = '';
  payment=false;
  total=0

  constructor(
    private service: CartService,
    private router: Router,
    private logger: LoggerService,
    public toast: ToastComponent,
    private accountService: AccountService,
  ) {}

  ngOnInit(): void {
   this.load();
   this.isCheckoutDone =false;
   this.currentUser$ = this.accountService.currentUser$;
    this.currentUser$.subscribe(data=>{
      if(data!= null){
        this.isLogedIn=true;
        

      }else{
        this.isLogedIn=false;
        
      }
    })
  }

  load(): void {
    this.reservations = this.service.getCartItem();
    console.log(this.reservations);
  }

  remove(item: CartItem) {
    this.service.removeCartItem(item);
    this.load();
  }

  checkout() {
    //alert("checkout")
    this.isCheckoutDone = true;
    this.shippingAddress= {
      Address:"",
      City:'',
      Country:'USA',
      State:'',
      Zip:0
    };
    this.cardInfo ={
      CardNumber:0,
      CardType: "",
      CVV:0,
      Expire:'',
      NameOnTheCard:''
    };
  }
  placeOrder(){

   if(this.cardInfo.Expire.length!=7) {
    alert("Please enter the expire date in the correct format.")
    return;
   }

   let cartitems= this.reservations.map(function(ci:any) {
      return {
        price: ci.productPrice,
        quantity: ci.quantity,
        product:{
          id:ci.productId
        }
      }
    });

    let orderobj={
      address: {
        address: this.shippingAddress.Address,
        city: this.shippingAddress.City,
        country: 'USA',
        state:this.shippingAddress.State,
        zipCode:this.shippingAddress.Zip.toString()

      },
      email: this.isLogedIn? '': this.useremai,
      totalPrice:0,
      paymentInfo:{
        "cardNumber": this.cardInfo.CardNumber.toString(),
        "nameOnCard":this.cardInfo.NameOnTheCard,
        "cvv":this.cardInfo.CVV,
        "expiryDate":"01/"+this.cardInfo.Expire,
        "amount":0
      },
      
      cartItemList: cartitems
    }
    this.service.placeOrder(orderobj).subscribe(data=>{
      this.toast.setMessage('Oder completed successfully', 'success');

      this.invoice = JSON.parse(JSON.stringify(this.service.getCartItem()));

      this.service.clearcart();
      this.isCheckoutDone = false;
      
      this.payment=true;

      var ttt = this.reservations.map(function(ci:any) {
        return ci.productPrice*ci.quantity 
      });
      let sum=0;

      ttt.forEach(item => {
        sum += item;
      });

      this.total = sum;
      this.reservations=[];



    }, err=>{
      this.toast.setMessage(`${err.error.message}`, 'danger');
      console.log(err);
    })
  }



}
