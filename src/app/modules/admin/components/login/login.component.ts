import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedServicesService } from 'src/app/services/shared-services/shared-services.service';

@Component({
  selector: 'admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private sharedServices: SharedServicesService, private router: Router) { }

  ngOnInit(): void {
  }
  login(adminForm: NgForm) {
    // Check the admin value
    if (adminForm.value.email == "admin@gmail.com" && adminForm.value.password == 'admin123') {
      // Set the user as admin in local storage so customer not login that time
      localStorage.setItem("active_user", "admin");
      this.sharedServices.showSuccess('Login Succesfull');
      this.router.navigate(['/admin/dashboard'])
    } else {
      this.sharedServices.showError('Invalid Credential');
    }


  }

}
