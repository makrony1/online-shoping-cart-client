import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { SysAdminComponent } from './sys-admin.component';

const routes: Routes = [
  { path: '', component: SysAdminComponent },
  { path: 'users', component: UsersComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SysAdminRoutingModule {}
