import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient, private _Router:Router) { }

  userdata:any;
  signout():void
{
  //remove token
  localStorage.removeItem('eToken');
  this._Router.navigate(['/login'])
}
 saveData():void{
    //get token from local storage
    //decode token
    //save in property
    if(localStorage.getItem('eToken') != null){
      let encodeToken:any = localStorage.getItem('eToken');
     let decode= jwtDecode(encodeToken);
     this.userdata = decode;
     console.log(this.userdata);

    }
  }

  setRegister(userData:object):Observable<any>
  {
   return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, userData )
  }


  setLogin(userData:object):Observable<any>
  {
   return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, userData )
  }
}
