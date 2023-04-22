import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { SysAdminComponent } from './sys-admin.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CategoryManageComponent } from './category-manage/category-manage.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';

const routes: Routes = [
  { path: '', component: SysAdminComponent },
  { path: 'users', component: UsersComponent},
  { path: 'products', component: ProductListComponent},
  { path: 'categories', component: CategoryManageComponent},
  { path: 'vendors', component: VendorListComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SysAdminRoutingModule {}
