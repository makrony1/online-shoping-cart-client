import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/product';
import { SysAdminService } from '../sysAdmin.service';

@Component({
  selector: 'app-category-manage',
  templateUrl: './category-manage.component.html',
  styleUrls: ['./category-manage.component.css']
})
export class CategoryManageComponent implements OnInit {

  categories: Category[];
  modalCategory: Category;
  isModalOpen = false;

  constructor(
    private category_service: SysAdminService
  ) { }

  ngOnInit(): void {
    this.getCategories();

    this.modalCategory = {
      id: 0,
      name: ''
    }
  }

  getCategories(): void {
    this.category_service.getCategories().subscribe(
      (data) => {
        this.categories = data;
      }
    );
  }

  createCategory(): void {
    this.modalCategory = {
      id: 0,
      name: ''
    }
    this.isModalOpen = true;
  }

  saveOrUpdateCategory(): void {
    if(this.modalCategory.id > 0){
      let update_pro = {
        "active": true,
        "id": this.modalCategory.id,
        "name": this.modalCategory.name
      }
      this.category_service.updateCategory(update_pro).subscribe(
        data=> {
        let old_obj = this.categories.find(x=>x.id==data.id);
        let x = this.categories.indexOf(old_obj);
        if(x>-1){
          this.categories[x] = data;
        }
        this.isModalOpen = false;
      });
    } else {
      let new_pro = {
        "active": true,
        //"id": this.modalCategory.id,
        "name": this.modalCategory.name
      }

      this.category_service.createCategory(new_pro).subscribe(data=>{
        this.categories.push(data);
        this.isModalOpen = false;
      },error=>{
        console.log("Failed to login");
        console.log(error);
      })
    }
  }

  edit(item): void {
    let items =JSON.stringify(item);
    this.modalCategory=JSON.parse(items);
    this.isModalOpen=true;
    console.log(item);
  }

  openmodal(): void {
    this.isModalOpen = true;
  }

  closemodal(): void {
    this.isModalOpen = false;
  }

}
