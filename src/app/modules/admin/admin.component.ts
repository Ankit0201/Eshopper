import { Component, OnInit } from '@angular/core';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public adminService:AdminService) { }

  ngOnInit(): void {
  }
  logoutAdmin(){
    if(confirm('Are You Sure')){
    localStorage.removeItem('active_user');
    }
  }

}
