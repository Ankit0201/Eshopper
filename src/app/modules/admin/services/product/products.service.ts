import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
    
  constructor(private http:HttpClient) { }

  // API for adding a product
  addNewProducts(product:any){
    return this.http.post(`${environment.API_URL}/product/createProduct`,product)
  }
  //API for get all product
  getProducts(){
    return this.http.get(`${environment.API_URL}/product/getProduct`)
  }
  // API for delete Category
  deleteProduct(id:any){
    return this.http.delete(`${environment.API_URL}/product/deleteProduct/${id}`)
  }

  //APi for Update the Product
  editProduct(id:any,data:any){
    return this.http.put(`${environment.API_URL}/product/updateProduct/${id}`,data)
  }
}
