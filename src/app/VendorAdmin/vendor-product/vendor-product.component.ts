import { Component, OnInit } from '@angular/core';
import { Category, Product } from 'src/app/shared/models/product';
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
  categories:Category[];

  ngOnInit(): void {
    this.loadVendorProducts();
    console.log("here is vendor products");
    this.loadCategories();
    this.modalProduct={
      actualPrice:0,
      id:0,
      name:'',
      sellingPrice:0,
      quantity:0,
      categoryId:0,
      categoryName:""

    }
  }

  loadCategories():void{
    this.service.getCategories().subscribe(data=>{
      this.categories=data;
      console.log(this.categories);
    })
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
      sellingPrice:0,
      quantity:0,
      categoryId:0,
      categoryName:''
    

    }
    this.isModalOpen=true;

  }

  saveOrUpdateProducts():void{
    console.log(this.modalProduct);
    if(this.modalProduct.id > 0){
      alert("Update products");
    }else{
      let new_pro = {
        "active": true,
        "actualPrice": this.modalProduct.actualPrice,
        "category": {
          "id": this.modalProduct.categoryId
          
        },
        "name": this.modalProduct.name,
        "quantity": this.modalProduct.quantity,
        "sellingPrice": this.modalProduct.sellingPrice
      }

      this.service.createProducts(new_pro).subscribe(data=>{
        this.products.push(data);
        this.isModalOpen = false;
      },error=>{
        console.log("Failed to login");
        console.log(error);
      })
    }

  }
}
