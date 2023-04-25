import { Component, OnInit } from '@angular/core';
import { Category, Product } from 'src/app/shared/models/product';
import { VendorAdminService } from '../vendorAdmin.service';
import { CurrentUser } from 'src/app/shared/models/user';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-vendor-product',
  templateUrl: './vendor-product.component.html',
  styleUrls: ['./vendor-product.component.css']
})
export class VendorProductComponent implements OnInit {

  constructor(private service: VendorAdminService, private accountService: AccountService) { }
  products: Product[];
  isModalOpen = false;
  modalProduct: Product;
  categories: Category[];
  currentUser$: Observable<CurrentUser>;
  userId=0;

  getImage(item):string{
    if(item.image == null || item.image== undefined){
      return 'https://image-us.samsung.com/us/smartphones/galaxy-s22/images/gallery/R0-Green/FLRC-214-R0-Green-01-PDP-GALLERY-1600x1200.jpg?$product-details-jpg$';
    }

    if(item.image.length >10){
      return item.image;
    }

    return 'https://image-us.samsung.com/us/smartphones/galaxy-s22/images/gallery/R0-Green/FLRC-214-R0-Green-01-PDP-GALLERY-1600x1200.jpg?$product-details-jpg$';
  }
  ngOnInit(): void {
    this.products =[];
    this.loadCategories();



    this.modalProduct = {
      actualPrice: 0,
      id: 0,
      name: '',
      sellingPrice: 0,
      quantity: 0,
      categoryId: 0,
      isActive: false,

      categoryName: ""

    }


    this.currentUser$ = this.accountService.currentUser$;
    this.currentUser$.subscribe(data=>{

      if(data!= null){
        this.loadVendorProducts();
        this.userId = data.id;
      }
      console.log(data);
      
    })

  }

  loadCategories(): void {
    this.service.getCategories().subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    })
  }
  loadVendorProducts(): void {
    this.service.getVendorProducts().subscribe(
      (data) => {

        console.log(this.userId);
        console.log(data)
        this.products = data.filter(p=>p.userId==this.userId)
        //this.products = data;
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

  edit(item): void {
    let items = JSON.stringify(item);
    this.modalProduct = JSON.parse(items);
    this.isModalOpen = true;
  }
  createProducts(): void {
    this.modalProduct = {
      actualPrice: 0,
      id: 0,
      name: '',
      sellingPrice: 0,
      quantity: 0,
      categoryId: 0,
      categoryName: '',
      isActive: false

    }
    this.isModalOpen = true;

  }

  saveOrUpdateProducts(): void {
    if (this.modalProduct.id > 0) {
      let update_pro = {
        "active": true,
        "actualPrice": this.modalProduct.actualPrice,
        "category": {
          "id": this.modalProduct.categoryId
        },
        "id": this.modalProduct.id,
        "name": this.modalProduct.name,
        "quantity": this.modalProduct.quantity,
        "sellingPrice": this.modalProduct.sellingPrice
      }
      this.service.updateProducts(update_pro).subscribe(data => {
        let old_obj = this.products.find(x => x.id == data.id);
        let x = this.products.indexOf(old_obj)
        if (x > -1) {
          this.products[x] = data;
        }
        this.isModalOpen = false;
      })
    } else {
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

      this.service.createProducts(new_pro).subscribe(data => {
        this.products.push(data);
        this.isModalOpen = false;
      }, error => {
        console.log("Failed to login");
        console.log(error);
      })
    }

  }
}
