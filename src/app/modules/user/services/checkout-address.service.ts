import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutAddressService {

  constructor(private http: HttpClient) { }

//Add New Address
  addNewAddress(address: any) {
    return this.http.post(`${environment.API_URL}/user/address/create`, address)
  }

  // Get Address
  getUserAddress(){
    return this.http.get(`${environment.API_URL}/user/address/get`)
    .pipe(
      map((result:any)=>{
        return result[0].address
      })
    )
  }
}
