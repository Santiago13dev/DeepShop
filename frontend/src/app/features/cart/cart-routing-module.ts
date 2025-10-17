import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartView } from './cart-view/cart-view';
import { Checkout } from './checkout/checkout';

/**
 * Rutas del módulo Cart
 */
const routes: Routes = [
  {
    path: '',
    component: CartView,
  },
  {
    path: 'checkout',
    component: Checkout,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
