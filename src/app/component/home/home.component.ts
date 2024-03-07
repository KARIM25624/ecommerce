import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/shared/interfaces/product';
import { EocdataService } from 'src/app/shared/services/eocdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-home',

  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

constructor(private _EocdataService:EocdataService ,
            private _CartService:CartService ,
            private _toastr: ToastrService,
            private spinner: NgxSpinnerService,
            private _WishlistService:WishlistService){}

searchTerm:string = '';

products:product[] = [];

categories:any[] = [];

wishlistData:string[] = [];

categoriesSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 300,
    navText: ['', ''],
    autoplay:true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  };
mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 500,
    navText: ['', ''],
    autoplay:true,
    items:1,
    nav: true
  };

  ngOnInit(): void {
  // get all products
    this._EocdataService.grtAllProducts().subscribe({

      next:(response)=>{
        // console.log(response);

        this.products = response.data

      }
    });


    //get categories
    this._EocdataService.getCategories().subscribe({
      next: (response)=>
      {
        this.categories = response.data;

      }
    });

    this._WishlistService.grtWishlist().subscribe({
      next:(response)=>{
        const newData = response.data.map((item:any)=>item._id);
        this.wishlistData = newData;
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
      this.wishlistData = response.data

    }
  })
}
removeFav(id:any):void{
this._WishlistService.removeWishlist(id).subscribe({
  next:(response)=>{
console.log(response);
this._toastr.success(response.message);
this.wishlistData = response.data;

  }
})
}
}




