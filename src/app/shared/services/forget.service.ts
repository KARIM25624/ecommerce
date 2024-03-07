import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetService {

  constructor(private _HttpClient:HttpClient) { }
  baseurl:string ='https://ecommerce.routemisr.com/api/v1/auth/';


  forgetPassword(userEmail:object):Observable<any> {
    return this._HttpClient.post(this.baseurl+ `forgotPasswords` , userEmail)
  }
  resetCode(reset:object):Observable<any> {
    return this._HttpClient.post(this.baseurl+ `verifyResetCode` , reset)
  }
  resetPass(resetpassword:object):Observable<any> {
    return this._HttpClient.put(this.baseurl+ `resetPassword` , resetpassword)
  }
}
