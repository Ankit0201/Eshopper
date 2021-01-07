import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProductService {

  constructor(private http:HttpClient) {  }

  // Get Product By Category
  getProductsByCategory(categoryId:any){
    return this.http.get(`${environment.API_URL}/product/getProductById/${categoryId}`)
  }

  // APi for Add to product in cart
  addProductInCart(cartProduct:any){
    return this.http.post(`${environment.API_URL}/user/cart/add-to-cart`,cartProduct)
  }

  // Api For get 
}
