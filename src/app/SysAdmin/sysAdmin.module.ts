import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SysAdminRoutingModule } from './sysadmin-routing.module';
import { UsersComponent } from './users/users.component';
import { SysAdminComponent } from './sys-admin.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@NgModule({
  declarations: [UsersComponent, SysAdminComponent, ProductListComponent],
  imports: [ SysAdminRoutingModule,
    
    CommonModule,
    SharedModule,
    FormsModule,]
})
export class SysAdminModule {}
