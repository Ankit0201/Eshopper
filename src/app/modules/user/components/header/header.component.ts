import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServicesService } from 'src/app/services/shared-services/shared-services.service';

@Component({
  selector: 'user-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public sharedService:SharedServicesService,private router:Router) { }

  ngOnInit(): void {
  }
  isLogOut(){
    if(confirm("Are You Sure??")){
      localStorage.removeItem('active_user');
      this.sharedService.showSuccess('Log-Out SuccessFully!!!!');
      this.router.navigate(['/user/sign-in'])
    }
  }
}
