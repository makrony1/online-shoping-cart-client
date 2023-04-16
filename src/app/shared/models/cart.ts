export interface CartItem {
  id: number;
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
}

export interface CheckOutResponse {
  totalPrice: string;
}
