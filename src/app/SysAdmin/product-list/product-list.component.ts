import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product/product.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];

  constructor(
    private service: ProductService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void{
    this.service.getProducts().subscribe(
      (data)=> {
        this.products = data;
      }
    );
  }

  approve(item):void{
    item.isActive=true;


  }

  decline(item):void{
    item.isActive=false;
    

  }

}
