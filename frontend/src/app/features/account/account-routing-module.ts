import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Profile } from './profile/profile';
import { Wishlist } from './wishlist/wishlist';
import { Orders } from './orders/orders';
import { Addresses } from './addresses/addresses';

/**
 * Rutas del módulo Account
 */
const routes: Routes = [
  {
    path: '',
    component: Profile,
  },
  {
    path: 'profile',
    component: Profile,
  },
  {
    path: 'wishlist',
    component: Wishlist,
  },
  {
    path: 'orders',
    component: Orders,
  },
  {
    path: 'addresses',
    component: Addresses,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
