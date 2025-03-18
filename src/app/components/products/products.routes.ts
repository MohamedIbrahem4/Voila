import { Routes } from "@angular/router";

export const productRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/products-page/products-page.component').then(m => m.ProductsPageComponent)
  },
  {
    path: 'productdetails',
    loadComponent: () => import('./pages/product-details/product-details.component').then(m => m.ProductDetailsComponent)
  },
]
