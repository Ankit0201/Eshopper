import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {
  cartItems: any;
  subTotal: number = 0

  constructor(private userCartService: CartService) { }

  ngOnInit(): void {
    this.getAllCartItems(); 
  }

  // Get All Cart Items Of Active/Login User
  getAllCartItems() {
    this.userCartService.getCartItems().subscribe(items => {
      if (items) {
        this.cartItems = items;
        this.calculateSubTotal()
      }
    })
  }

  // Calculate the Tatal amount
  calculateSubTotal() {
    this.subTotal = 0
    this.cartItems.forEach((element: any) => {
      this.subTotal = (element.quantity * element.product_id.price) + this.subTotal;
    });
  }

  // Delete cart items into the cart
  cartProductDelete(productId: any) {
    if(confirm("Are you Want To delete??")){
      this.userCartService.deleteProductFromCart(productId).subscribe(resp => {
        this.getAllCartItems();
      })
    }
  
  }

  increment(cart: any, action: string) {
   // Check action is increment or decrement
    if (action === "increment") {
      if (cart.product_id.quantity > cart.quantity) {
        cart.quantity = cart.quantity + 1; // Increase the qauntity
      }
    } else {
      if (cart.quantity > 1) {
        //  Decrease the Quantity
        cart.quantity = cart.quantity - 1
      }
    }

    let cartItems = {
      product_id: cart.product_id._id,
      quantity: cart.quantity
    }
    // Call api for update
    this.userCartService.updateProductQuantity(cartItems).subscribe(resp => {
      console.log(resp);
    })
    this.calculateSubTotal()
  }
}
