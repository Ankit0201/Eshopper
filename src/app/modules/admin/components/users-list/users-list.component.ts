import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = ['Profile-Image', 'Name', 'Email', 'Contact', 'Address', 'Action'];
  usersListData: any
  searchKey: any
  constructor(private adminUserService: UserService) { }

  ngOnInit(): void {
    this.adminUserService.getUsers().subscribe((users: any) => {

      console.log(users);

      users.forEach((data: any) => {
        //Parse the adress
        data.address = JSON.parse(data.address)
      });
      this.usersListData = new MatTableDataSource(users);
    })
  }

  apply() {
    this.usersListData.filter = this.searchKey.trim().toLocaleLowerCase()
  }

  close() {
    this.ngOnInit()
  }
}
