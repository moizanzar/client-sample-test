import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { ProductListingComponent } from './product/product-listing/product-listing.component'

const routes:Routes = [
  { path:'', component: ProductListingComponent },
  { path:'product', component: ProductListingComponent },
  { path: '**', redirectTo: '/product' }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
