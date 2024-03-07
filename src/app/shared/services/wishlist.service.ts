import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
baseUrl:string = 'https://ecommerce.routemisr.com/api/v1/';

  constructor(private _HttpClient:HttpClient) { }

addToWishlist(proId:any):Observable<any>{
  return this._HttpClient.post(this.baseUrl +`wishlist`, {productId:proId})
};
grtWishlist():Observable<any>{
  return this._HttpClient.get(this.baseUrl + `wishlist`)
}
removeWishlist(id:any):Observable<any>{
  return this._HttpClient.delete(this.baseUrl + `wishlist/${id}`)
}
  }

