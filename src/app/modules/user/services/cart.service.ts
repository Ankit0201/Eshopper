import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  // Get All Cart Items Of Login user
  getCartItems() {
    return this.http.get(`${environment.API_URL}/user/cart/get-cart-items`)
      .pipe(
        map((resp: any) => {
          return resp[0].cartItems
        })
      )
  }

  // Delete product of login user cart
  deleteProductFromCart(id: any) {
    return this.http.delete(`${environment.API_URL}/user/cart/delete-product/${id}`)
  }

  // Update Cart Quantity when user increment or decrement the quantity
  updateProductQuantity(productQuantity:any){
    return this.http.post(`${environment.API_URL}/user/cart/update-cart-quantity`,productQuantity)
  }
}
