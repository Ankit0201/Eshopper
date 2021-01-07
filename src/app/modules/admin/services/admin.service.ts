import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
// Check active user from local storage
  checkActiveUser(){
       if(localStorage.getItem('active_user')){
         return true;
       }else{
         return false
       }
  }

  // API for adding a category
  addNewCategories(category:any){
    return this.http.post(`${environment.API_URL}/category/createCategory`,category)
  }

  // API for deleteCategory
  deleteCategory(id:any){
    return this.http.delete(`${environment.API_URL}/category/deleteCategory/${id}`)
  }

  //APi for Update the Category
  editCategory(id:any,data:any){
    return this.http.put(`${environment.API_URL}/category/updateCategory/${id}`,data)
  }
}
