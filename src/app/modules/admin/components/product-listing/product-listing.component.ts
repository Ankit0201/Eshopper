import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { SharedServicesService } from 'src/app/services/shared-services/shared-services.service';
import { ProductsService } from '../../services/product/products.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {
  productForm: any;
  file: any
  products: any;
  allCategory: any
  subCategory: any = [];
  displayedColumns: string[] = ['Image', 'Product-Name', 'Category', 'Price', 'Description', 'Action'];
  dataSource: any = [];
  listData: any;
  isEdit: any;
  selectProduct: any
  new: any;
  searchKey:any
  constructor(private fb: FormBuilder,
    private sharedService: SharedServicesService,
    private productService: ProductsService) { }

  ngOnInit(): void {
    this.getAllCategories();//get All categories
    this.getAllProducts();  //get All Product
    // Build a Form
    this.productForm = this.fb.group({
      product_name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      product_img: [''],
      category: ['', Validators.required],
    })
  }

  // Get all categories
  getAllCategories() {
    this.sharedService.getCategories().subscribe(resp => {
      this.allCategory = resp;
      this.allCategory = this.allCategory.category; // Assign main category/parent category

      // Get a sub-categories
      this.allCategory.map((cat: any) => {
        this.subCategory.push(cat.sub_categories); // Push all subcategories
      })
      this.subCategory = this.subCategory.flat(Infinity); // Covert sub-array into single array usinf flat function
    })
  }

  //Get All Producst from back end
  getAllProducts() {
    this.productService.getProducts().subscribe(product => {
      this.dataSource = product;
      this.listData = new MatTableDataSource(this.dataSource.product);
    })
  }


  // Selecting the product images
  selectImage(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }
  //   Append the Form data
  prepareForm() {
    let control = this.productForm.controls
    let formData = new FormData
    formData.append('product_name', control['product_name'].value);
    formData.append('description', control['description'].value);
    formData.append('price', control['price'].value);
    formData.append('quantity', control['quantity'].value);
    formData.append('category', control['category'].value);
    formData.append('productImg', this.file);
    return formData
  }

  // This is for adding updating the product

  addProduct() {
    this.products = this.prepareForm(); // Get a formData
    if (!this.isEdit) {
      this.productService.addNewProducts(this.products).subscribe(products => {
        this.getAllProducts()
        this.sharedService.showSuccess(`Product Added SuccesFully`)
      })
    } else {
      //Updating the product

      this.productService.editProduct(this.isEdit, this.products).subscribe(resp => {
        this.getAllProducts();
        this.isEdit=''
        this.sharedService.showSuccess('Updated SuccesFully')

      })
    };
    
    this.productForm.reset()
  }

  // Remove the product from databse 
  removeProduct(id: any) {
    if (confirm('Are You Sure To Remove Category')) {
      this.productService.deleteProduct(id).subscribe(resp => {
        this.sharedService.showSuccess('Delete SuccesFully');
        this.ngOnInit()
      },
        error => {
          this.sharedService.showError(error['error'].message)
        })

    }
  }

  editProduct(id: string) {
    this.isEdit = id;
    this.selectProduct = this.dataSource.product.filter((resp: any) => resp._id == id)

    this.productForm.patchValue({
      product_name: this.selectProduct[0]['product_name'],
      description: this.selectProduct[0]['description'],
      quantity: this.selectProduct[0]['quantity'],
      price: this.selectProduct[0]['price'],
      category: this.selectProduct[0]['category']._id,

    })
  }

  // Search a category
  apply() {
    this.listData.filter = this.searchKey.trim().toLocaleLowerCase()
  }

  closeModel(){
    this.isEdit='';
    this.productForm.reset()
  }

}
