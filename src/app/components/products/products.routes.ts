import { Routes } from "@angular/router";

export const productRoutes: Routes = [
  {
    path: 'products/:category',
    loadComponent: () => import('./pages/products-page/products-page.component').then(m => m.ProductsPageComponent)
  },
  {
    path: 'productdetails/:id',
    loadComponent: () => import('./pages/product-details/product-details.component').then(m => m.ProductDetailsComponent)
  },
]
