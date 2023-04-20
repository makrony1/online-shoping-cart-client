import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { VendorAdminRoutingModule } from './vendor-routing.module';
import { VendorComponent } from './vendor/vendor.component';
import { VendorProductComponent } from './vendor-product/vendor-product.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [VendorComponent, VendorProductComponent, LeftPanelComponent],
  imports: [
    CommonModule,
    VendorAdminRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ButtonsModule,]
})
export class VendorAdminModule { }
