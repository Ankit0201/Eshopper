import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatTableDataSource } from '@angular/material/table';
import { SharedServicesService } from 'src/app/services/shared-services/shared-services.service';
import { AdminService } from '../../services/admin.service';
import { ProductListingComponent } from '../product-listing/product-listing.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  displayedColumns: string[] = ['Category-Name', 'Sub-Categories', 'Edit', 'Delete',];
  dataSource: any = [];
  listData: any;
  searchKey: any;
  category: Object = {}
  isEdit: any;
  categoryForm: any

  constructor(private sharedService: SharedServicesService,
    private adminServcice: AdminService, private fb: FormBuilder) { }

    @ViewChild(MatPaginator) paginator:any
    @ViewChild(MatSort) sort:any

  ngOnInit(): void {
    this.getAllCategories();
    this.categoryForm = this.fb.group({
      category: ['', Validators.required],
      parentCategory: ['']
    })

  }
  // Get all categories
  getAllCategories() {
    this.sharedService.getCategories().subscribe(resp => {
      this.dataSource = resp;
      this.listData = new MatTableDataSource(this.dataSource.category);
      this.listData.paginator=this.paginator;
      this.listData.sort=this.sort
    })
  }

  // Search a category
  apply() {
    this.listData.filter = this.searchKey.trim().toLocaleLowerCase()
  }

  // Added a new category
  addCategory() {
    if (!this.isEdit) {
      // Add new category
      this.adminServcice.addNewCategories(this.categoryForm.value).subscribe(resp => {
        // Reload the all categories get updated categories
        this.sharedService.showSuccess(`Category Added SuccessFully`)
        this.ngOnInit()
      },
        err => {
          // get any error from server
          this.sharedService.showError(err['error'].message);
        })


    } else {
      // Update the category.......
      this.adminServcice.editCategory(this.isEdit, this.categoryForm.value).subscribe(resp => {
        this.sharedService.showSuccess(`Category Update SuccessFully`);
        this.ngOnInit()
      })

    }
    this.categoryForm.reset()
  }


// If we edit the category so set the value in form
  editCategory(categories: any) {
    this.isEdit=categories._id
    this.categoryForm.patchValue({
      category: categories['name'],
       parentCategory: categories['parentCategory']
    })
  }

  //Delete the Category
  removeCategory(id: any) {
    if (confirm('Are You Sure To Remove Category')) {
      this.adminServcice.deleteCategory(id).subscribe(resp => {
        this.sharedService.showSuccess('Delete SuccesFully');
        this.ngOnInit()
      },
        error => {
          this.sharedService.showError(error['error'].message)
        })

    }
  }

  // When we click on edit buttonu and close so assign isEdit to b null
  close() {
    this.isEdit = null;
    this.categoryForm.reset()
    
  }

  //Sorting the category

  sortCategory() {
    let data = this.listData.filteredData.sort((a: any, b: any) => a.name.localeCompare(b.name));
    this.listData = new MatTableDataSource(data)
  
  }

}
