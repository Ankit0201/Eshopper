import { Component, OnInit } from '@angular/core';
import { SharedServicesService } from 'src/app/services/shared-services/shared-services.service';

@Component({
  selector: 'admin-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(private sharedService:SharedServicesService) { }

  ngOnInit(): void {
  }
  

}
