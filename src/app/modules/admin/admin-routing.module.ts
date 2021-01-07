import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { AuthGuard, LoginGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path:'' , redirectTo:'login',pathMatch:'full'
  },

  {
    path: '',
    children: [
      { path: 'login', component: AdminComponent ,canActivate:[LoginGuard]},
      {path:'dashboard',component:DashboardComponent,canActivate: [AuthGuard]},
      {path:'category-list',component:CategoryListComponent,canActivate: [AuthGuard]},
      {path:'products-listing',component:ProductListingComponent,canActivate: [AuthGuard]},
      {path:'users-list',component:UsersListComponent,canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
