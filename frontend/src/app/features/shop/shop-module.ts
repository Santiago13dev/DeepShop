import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopRoutingModule } from './shop-routing-module';
import { Home } from './home/home';
import { Catalog } from './catalog/catalog';
import { Category } from './category/category';
import { Categories } from './categories/categories';
import { Offers } from './offers/offers';

/**
 * Módulo Shop
 * Contiene las páginas principales de la tienda
 */
@NgModule({
  imports: [
    CommonModule,
    ShopRoutingModule,
    Home,
    Catalog,
    Category,
    Categories,
    Offers,
  ],
})
export class ShopModule {}
