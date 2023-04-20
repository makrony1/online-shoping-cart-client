import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SysAdminRoutingModule } from './sysadmin-routing.module';
import { UsersComponent } from './users/users.component';
import { SysAdminComponent } from './sys-admin.component';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  declarations: [UsersComponent, SysAdminComponent, ProductListComponent],
  imports: [CommonModule, SysAdminRoutingModule, SharedModule]
})
export class SysAdminModule {}
