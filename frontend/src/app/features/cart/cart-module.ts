import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart-routing-module';
import { CartView } from './cart-view/cart-view';
import { Checkout } from './checkout/checkout';

/**
 * Módulo Cart
 * Contiene las páginas del carrito y checkout
 */
@NgModule({
  imports: [
    CommonModule,
    CartRoutingModule,
    CartView,
    Checkout,
  ],
})
export class CartModule {}
