import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorComponent } from './vendor/vendor.component';
import { VendorProductComponent } from './vendor-product/vendor-product.component';

const routes: Routes = [
  { path: '', component: VendorComponent },
  { path: 'products', component: VendorProductComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorAdminRoutingModule {}
