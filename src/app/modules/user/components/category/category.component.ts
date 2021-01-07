import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServicesService } from 'src/app/services/shared-services/shared-services.service';
import { ProductsDetailsComponent } from '../products-details/products-details.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  allCategory:any;
  categoryId:any="5fec5a02c552f942d45573d9"

  constructor(private sharedSevice:SharedServicesService ,private router:Router) { }
  
  @ViewChild (ProductsDetailsComponent) pp:any

  ngOnInit(): void {
    this.sharedSevice.getCategories().subscribe(category=>{
     this.allCategory=category;
     this.allCategory=this.allCategory.category
      
    },
    error=>{
      this.sharedSevice.showError(error['error'].message,);
      this.router.navigate(['/user/sign-in'])
    })
  }

  getProductByCategory(categoryId:any){
   this.categoryId=categoryId;
   setTimeout(() => {
    this.pp.ngOnInit()
   }, 1000);

         
  }

}
