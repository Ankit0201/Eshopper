import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedServicesService {

  constructor(private toastr: ToastrService,private http:HttpClient) { }
//  Get all categories and sub-categories from backend
  getCategories(){
    return this.http.get(`${environment.API_URL}/category/getCategory`)
  }

  demo(){
    return this.http.get(`${environment.API_URL}/user/dashboard`)
  }

  // Get Token
  isTokenAvailable(){
   let token= JSON.parse(localStorage.getItem('active_user') || '{}');
   if(token){
    return token.token
   }  
  }
  showSuccess(message:any) {
    this.toastr.success(message);
  };
  showError(error:any){
    this.toastr.error(error)
  }
}
