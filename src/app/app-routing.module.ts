import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../app/core/auth/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/product', pathMatch: 'full' },
  {
    path: 'product',
    loadChildren: () =>
      import('./product/product.module').then((module) => module.ProductModule),
    //canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./shopping-cart/shopping-cart.module').then(
        (module) => module.ShoppingCartModule),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((module) => module.AccountModule),
  },
  {
    path: 'vendor',
    loadChildren: () =>
      import('./VendorAdmin/VendorAdmin.module').then((module) => module.VendorAdminModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./SysAdmin/sysAdmin.module').then((module) => module.SysAdminModule),
  },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
