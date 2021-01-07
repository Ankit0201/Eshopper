import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  //API for signin or register

  userRegister(user: any) {
    return this.http.post(`${environment.API_URL}/user/create`, user)
  }

  // API for login authentication

  userLogin(user:any){
    return this.http.post(`${environment.API_URL}/user/user-login`, user)
  }

}
