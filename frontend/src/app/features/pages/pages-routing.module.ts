import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Help } from './help/help';
import { Contact } from './contact/contact';
import { About } from './about/about';
import { Privacy } from './privacy/privacy';
import { Terms } from './terms/terms';
import { Shipping } from './shipping/shipping';
import { Returns } from './returns/returns';

/**
 * Rutas del módulo Pages (páginas estáticas)
 */
const routes: Routes = [
  { path: 'help', component: Help },
  { path: 'contact', component: Contact },
  { path: 'about', component: About },
  { path: 'privacy', component: Privacy },
  { path: 'terms', component: Terms },
  { path: 'shipping', component: Shipping },
  { path: 'returns', component: Returns },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
