import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedServicesService } from 'src/app/services/shared-services/shared-services.service';
import { UserService } from 'src/app/services/shared-services/user/user.service';

@Component({
  selector: 'user-sign-in',
  templateUrl: './user-sign-in.component.html',
  styleUrls: ['./user-sign-in.component.css']
})
export class UserSignInComponent implements OnInit {
  file: any;
  registerForm: any;

  constructor(private fb: FormBuilder,private userService:UserService,private sharedService:SharedServicesService) { }

  userSigninForm: any
  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.userSigninForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.checkPassword]],
      phone: ['', [Validators.required,Validators.minLength(10)]],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        zip: ['']
      }),
      role: [''],
      userImg: ['']


    })
  }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      console.log(this.file);
      
    }
  }
  //   Append the Form data
  prepareForm() {
    let control = this.userSigninForm.controls
    let formData = new FormData
    formData.append('firstname', control['firstname'].value);
    formData.append('lastname', control['lastname'].value);
    formData.append('email', control['email'].value);
    formData.append('password', control['password'].value);
    formData.append('role', control['role'].value);
    formData.append('address', JSON.stringify(control['address'].value));
    formData.append('phone', control['phone'].value);
    formData.append('userImg', this.file);
    return formData
  }

  // Resgister a user
  registerUser() {
    this.registerForm=this.prepareForm();
    this.userService.userRegister(this.registerForm).subscribe(user=>{
      console.log(user);
      this.sharedService.showSuccess('SuccessFully Register !! ');
      this.userSigninForm.reset()
      
    },
    error=>{
            this.sharedService.showError(error['error'].message || "Email is already register")
    })
  }

get controls(){
  return this.userSigninForm.controls
}
  // Password authentication
  checkPassword(control: any) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }
  getErrorPassword() {
    return this.userSigninForm.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.userSigninForm.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }
}
