import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
 constructor(private _WishlistService:WishlistService , private _CartService:CartService , private _toastr:ToastrService){}

products:product[] =[]
searchTerm:string = '';
wishListData:string[]= []
 ngOnInit(): void {
     this._WishlistService.grtWishlist().subscribe({
      next:(response)=>{
        console.log(response);
        this.products = response.data
      }
     });
     this._WishlistService.grtWishlist().subscribe({
      next:(response)=>{
        const newData = response.data.map((item:any)=>item._id);
        this.wishListData = newData;
      }
    })
 };


 addcart(id:string):void
{
this._CartService.addProductToCart(id).subscribe({
  next: (ResponseCart)=>{
    console.log(ResponseCart);
    this._toastr.success(ResponseCart.message)
  },
  error:(err)=>{
    console.log(err);

  }
})
};
fav(prodId:any):void{
  this._WishlistService.addToWishlist(prodId).subscribe({
    next:(response)=>{
      console.log(response);
      this._toastr.success(response.message);
      this.wishListData = response.data;

    }
  })
}
removeFav(id:any):void{
this._WishlistService.removeWishlist(id).subscribe({
  next:(response)=>{
    console.log(response);
this._toastr.success(response.message);
this.wishListData = response.data;

const newProductData = this.products.filter(  (item:any)=>  this.wishListData.includes(item._id));
this.products = newProductData;

  }
})
}

}
