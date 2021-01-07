import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServicesService } from 'src/app/services/shared-services/shared-services.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public adminService:AdminService ,
              private router:Router ,
              private sharedService:SharedServicesService) { }

  ngOnInit(): void {
  }
  logoutAdmin(){
    if(confirm('Are You Sure')){
    localStorage.removeItem('active_user');
    this.sharedService.showSuccess('Admin Logout SuccessFully')
    this.router.navigate(['/admin/login']);

    }
  }

}
