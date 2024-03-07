import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }





  addProductToCart(productId:string):Observable<any>
  {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,
     {productId:productId} ,
     )
  };





  getuserCart():Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart` , )


  }




  removecartItem(productId:string):Observable<any>
  {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,
    )
  };


  updateCount(productId:string , count:number):Observable<any>
  {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,
    {
    "count":count,
    },

     )
  };


  checkout(cartid:string , userdate:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=http://localhost:4200` ,
    {
      shippingadress:userdate
    },
    )


  }
}
