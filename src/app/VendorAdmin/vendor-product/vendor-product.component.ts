import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { VendorAdminService } from '../vendorAdmin.service';

@Component({
  selector: 'app-vendor-product',
  templateUrl: './vendor-product.component.html',
  styleUrls: ['./vendor-product.component.css']
})
export class VendorProductComponent implements OnInit {

  constructor(private service: VendorAdminService) { }
  products: Product[];
  isModalOpen=false;
  modalProduct: Product;

  ngOnInit(): void {
    this.loadVendorProducts();
    console.log("here is vendor products");
    this.modalProduct={
      actualPrice:0,
      id:0,
      name:'',
      price:0,
      quantity:0
    }
  }

  loadVendorProducts():void{
    this.service.getVendorProducts().subscribe(
      (data) => {
        
        this.products = data;
        console.log(this.products);
      }
    );
  }
  openmodal():void{
    
this.isModalOpen=true;
  }


  closemodal():void{
    
    this.isModalOpen=false;
      }
  edit(item):void{
    this.modalProduct=item;
    this.isModalOpen=true;
    console.log(item);
  }
  createProducts():void{
    this.modalProduct={
      actualPrice:0,
      id:0,
      name:'',
      price:0,
      quantity:0

    }
    this.isModalOpen=true;

  }

  saveOrUpdateProducts():void{
    if(this.modalProduct.id> 0){
      alert("Update products");
    }else{
      alert("new")
    }

  }
}
