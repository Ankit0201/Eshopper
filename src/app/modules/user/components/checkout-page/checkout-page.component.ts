import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { SharedServicesService } from 'src/app/services/shared-services/shared-services.service';
import { CheckoutAddressService } from '../../services/checkout-address.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  userAddressForm: any
  showAddress:boolean=false;
  userAddress:any

  constructor(private fb: FormBuilder,
    private checkoutAddressService: CheckoutAddressService,
    private sharedService: SharedServicesService) { }

  ngOnInit(): void {
    this.createForm();
    this.getAddress();
    setTimeout(() => {
      if(this.userAddress){
        this.showAddress=true
      }
    }, 1000);
    
  }

  createForm() {
    this.userAddressForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      locality: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      alternate_phone: [''],
    })
  }

  addAddress() {
    this.checkoutAddressService.addNewAddress(this.userAddressForm.value).subscribe(resp => {
      console.log(resp);
      this.sharedService.showSuccess('Address Added SuccesFully');

      this.showAddress=true;
      this.getAddress()
    },
      err => {
        console.log(err);

      })

  }

  getAddress(){
    this.checkoutAddressService.getUserAddress().subscribe(resp=>{
 this.userAddress=resp
    })
  }
}
