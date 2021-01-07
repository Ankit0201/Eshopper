import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedServicesService } from '../services/shared-services/shared-services.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private sharedService:SharedServicesService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token=this.sharedService.isTokenAvailable()
    
    let tokenReq=request.clone({
      setHeaders:{
        'Authorization':`Bearer ${token}`
      }
    })
    return next.handle(tokenReq);
  }
}
