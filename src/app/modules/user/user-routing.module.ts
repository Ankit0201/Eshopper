import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import { HomeComponent } from './components/home/home.component';
import { UserCartComponent } from './components/user-cart/user-cart.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
const routes: Routes = [
  {
    path:'' , redirectTo:'user-login',pathMatch:'full'
  },

  {
    path: '',
    children: [
      { path: '', component: HomeComponent},
      { path: 'sign-in', component: UserLoginComponent},
      { path: 'products-details', component: CategoryComponent},
      { path: 'cart', component: UserCartComponent},
      { path: 'checkout-page', component: CheckoutPageComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
