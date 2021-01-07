import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import { UserComponent } from './user.component';
import { HeaderComponent } from './components/header/header.component';
import { UserSignInComponent } from './components/user-sign-in/user-sign-in.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { MaterialModule } from 'src/app/shared_module/material/material.module';
import { CategoryComponent } from './components/category/category.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { UserCartComponent } from './components/user-cart/user-cart.component';
import { ViewProductDetailComponent } from './components/view-product-detail/view-product-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './components/home/home.component';




@NgModule({
  declarations: [UserComponent, HeaderComponent, UserLoginComponent, CategoryComponent, ProductsDetailsComponent, UserCartComponent, ViewProductDetailComponent, CheckoutPageComponent, HomeComponent],
  imports: [
  
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[UserComponent],
  bootstrap:[UserComponent]
})
export class UserModule {
  constructor(){
  console.log("User Module Loaded")
  }
  
 }
