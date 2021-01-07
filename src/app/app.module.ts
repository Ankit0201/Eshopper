import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS}  from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { SharedServicesService } from './services/shared-services/shared-services.service';
import { MaterialModule } from './shared_module/material/material.module';
import { HomeComponent } from './components/home/home.component';
import { TokenInterceptor } from './interceptor/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MaterialModule ,//Shared Module of angular-Material
  
    
    
  ],
  providers: [SharedServicesService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
