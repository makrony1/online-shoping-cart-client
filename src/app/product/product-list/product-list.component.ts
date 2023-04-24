import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../shared/models/product';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { LoggerService } from '../../shared/service/logger.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  isLoading = true;
  searchText='';

  constructor(
    private service: ProductService,
    private loggerService: LoggerService,
    public toast: ToastComponent,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const search = params['search'];
      console.log(search);
      if((search!= null || search!= undefined) &&search.length > 0){
        this.searchText = search;

      }else{
        this.searchText = '';
      }
      this.getProducts();
    });
    
  }
//{"id":1,"name":"Samsung Galaxy S22","price":1000.0}
  getProducts(): void {
    this.service.getProducts().subscribe(
      (data) => {
        console.log(data);
        if(this.searchText.length>0){
          this.products = data.filter(p=>p.name.toLowerCase().includes(this.searchText.toLocaleLowerCase()))

        }else{
          this.products = data;

        }
        
      },
      (error) => this.loggerService.logError('ProductListComponent', error.error),
      () => (this.isLoading = false)
    );
  }
}
