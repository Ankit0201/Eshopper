import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SharedServicesService } from 'src/app/services/shared-services/shared-services.service';
import { UserProductService } from '../../services/user-product.service';
import { ViewProductDetailComponent } from '../view-product-detail/view-product-detail.component';

@Component({
  selector: 'user-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {

  @Input() catId: any
  products: any;
  isProductsExists: any

  constructor(private userProductService: UserProductService,
               private sharedService: SharedServicesService,
               private dialog:MatDialog) { }

  ngOnInit(): void {
    if (this.catId) {
      // Get  catId from category component through parent to child concept;
      // Get the product by category 
      this.userProductService.getProductsByCategory(this.catId).subscribe((resp: any) => {
        this.products = resp['product']
        // Check product is available of this category
        if (this.products.length > 0) {
          console.log(this.products);     
          this.isProductsExists = false
        } else {
          this.isProductsExists = true
        }
      },
        error => {
          console.log(error);
        })
    }
  }


  // Added product in user cart
  addedToCart(productId: any) {
    let cartObj = {
      cartItems: {
                   product_id: productId
                 }
               }
    this.userProductService.addProductInCart(cartObj).subscribe((response: any) => {
      this.sharedService.showSuccess(response['message'])
    },
      err => {
        console.log(err);
      })
  }

  // Open dialog box for view product details
  openViewProductDetail(product:any){
    let dialogRef = this.dialog.open(ViewProductDetailComponent, {
      height: '400px',
      width: '50%',
      data: {product:product}
    });
  }
}


