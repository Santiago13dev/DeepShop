import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';

/**
 * Configuración de rutas de la aplicación Deepshop
 */
export const routes: Routes = [
  // Rutas principales con layout principal
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/shop/shop-module').then((m) => m.ShopModule),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./features/product/product-module').then(
            (m) => m.ProductModule
          ),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./features/cart/cart-module').then((m) => m.CartModule),
      },
      {
        path: 'account',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/account/account-module').then(
            (m) => m.AccountModule
          ),
      },
      // Páginas estáticas
      {
        path: 'help',
        loadComponent: () =>
          import('./features/pages/help/help').then((m) => m.Help),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/pages/contact/contact').then((m) => m.Contact),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/pages/about/about').then((m) => m.About),
      },
      {
        path: 'privacy',
        loadComponent: () =>
          import('./features/pages/privacy/privacy').then((m) => m.Privacy),
      },
      {
        path: 'terms',
        loadComponent: () =>
          import('./features/pages/terms/terms').then((m) => m.Terms),
      },
      {
        path: 'shipping',
        loadComponent: () =>
          import('./features/pages/shipping/shipping').then((m) => m.Shipping),
      },
      {
        path: 'returns',
        loadComponent: () =>
          import('./features/pages/returns/returns').then((m) => m.Returns),
      },
    ],
  },

  // Rutas de autenticación con layout de auth
  {
    path: 'auth',
    component: AuthLayout,
    loadChildren: () =>
      import('./features/auth/auth-module').then((m) => m.AuthModule),
  },

  // Rutas de administración con layout admin
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [adminGuard],
    loadChildren: () =>
      import('./features/admin/admin-module').then((m) => m.AdminModule),
  },

  // Ruta 404
  {
    path: '**',
    redirectTo: '',
  },
];
