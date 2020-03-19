import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
//custom components
import { ProductListingComponent } from './product/product-listing/product-listing.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { AppMaterialModuleModule } from './app-material-module.module';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductListingComponent,
    AddProductComponent
  ],
  imports: [
    AppMaterialModuleModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
