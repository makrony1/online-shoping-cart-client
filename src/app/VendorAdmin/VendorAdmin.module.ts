import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { VendorAdminRoutingModule } from './vendor-routing.module';
import { VendorComponent } from './vendor/vendor.component';
import { VendorProductComponent } from './vendor-product/vendor-product.component';

@NgModule({
  declarations: [ VendorComponent, VendorProductComponent],
  imports: [CommonModule, VendorAdminRoutingModule, SharedModule]
})
export class VendorAdminModule {}
