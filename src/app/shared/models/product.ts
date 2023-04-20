export interface Product {
  id: number;
  name: string;
  sellingPrice: number;
  actualPrice:number;
  quantity:number;
  categoryId:number;
  categoryName:string;
}


export interface Category{
  id:number;
  name:string;
}