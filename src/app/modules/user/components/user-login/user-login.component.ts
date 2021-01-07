import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedServicesService } from 'src/app/services/shared-services/shared-services.service';
import { UserService } from 'src/app/services/shared-services/user/user.service';

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
 setToken:any=[]
  constructor(private userService:UserService,private sharedService:SharedServicesService,private router:Router) { }

  ngOnInit(): void {
    
  }
  
  userLogin(user:NgForm){
  this.userService.userLogin(user.value).subscribe(resp=>{
        console.log(resp);
        
    localStorage.setItem('active_user',JSON.stringify(resp));
    this.sharedService.showSuccess('Login Successfuly');
    this.router.navigate(['/user/products-details'])
  },
  error=>{
    this.sharedService.showError(error['error'].message)
  })
  
  }

}
