export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productPrice: number;
  quantity: number;
}

export interface CheckOutResponse {
  totalPrice: string;
}

export interface ShippingAddress{
  Address: string;
  City:String;
  State:string;
  Zip:number;
  Country:string
}

export interface CardInfo{
  CardType:string;
  CardNumber:number;
  Expire:string;
  CVV:number
  NameOnTheCard: string
  
}