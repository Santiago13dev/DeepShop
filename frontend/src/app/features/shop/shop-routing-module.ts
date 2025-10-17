import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Catalog } from './catalog/catalog';
import { Category } from './category/category';
import { Categories } from './categories/categories';
import { Offers } from './offers/offers';

/**
 * Rutas del módulo Shop
 */
const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'catalog',
    component: Catalog,
  },
  {
    path: 'categories',
    component: Categories,
  },
  {
    path: 'category/:slug',
    component: Category,
  },
  {
    path: 'offers',
    component: Offers,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
