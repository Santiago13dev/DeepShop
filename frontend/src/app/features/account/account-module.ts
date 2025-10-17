import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing-module';
import { Profile } from './profile/profile';
import { Wishlist } from './wishlist/wishlist';
import { Orders } from './orders/orders';
import { Addresses } from './addresses/addresses';

/**
 * Módulo Account
 * Contiene las páginas de cuenta de usuario
 */
@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    Profile,
    Wishlist,
    Orders,
    Addresses,
  ],
})
export class AccountModule {}
