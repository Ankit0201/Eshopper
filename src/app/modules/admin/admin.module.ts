import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from './services/admin.service';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HeaderComponent } from './components/header/header.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialModule } from 'src/app/shared_module/material/material.module';
import { UsersListComponent } from './components/users-list/users-list.component';



@NgModule({
  declarations: [AdminComponent, LoginComponent, SideNavComponent, HeaderComponent, CategoryListComponent, ProductListingComponent, DashboardComponent, UsersListComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ],
  providers:[AdminService],
  exports:[AdminComponent]
})
export class AdminModule { 
  constructor(){
    console.log('Loaded');
    
  }
}
