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
    this.service.getAllProducts().subscribe(
      (data)=> {
        this.products = data;
      }
    );
  }

  approve(item):void{
    
    this.service.activateProduct(item.id).subscribe(data=>{
      item.isActive=true;
    })


  }

  decline(item):void{
    this.service.deactivateProduct(item.id).subscribe(data=>{
      item.isActive=false;
    })
  }

}
