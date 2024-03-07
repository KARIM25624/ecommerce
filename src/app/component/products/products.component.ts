import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EocdataService } from 'src/app/shared/services/eocdata.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  constructor(private _EocdataService:EocdataService , private _CartService:CartService
    ,private _toastr: ToastrService,
    private spinner: NgxSpinnerService , private NgxPaginationModule:NgxPaginationModule
    ,private _WishlistService:WishlistService){}


    total:number = 0;
    currentPage:number = 1;
    pageSize:number=0;
  products:product[]=[];
  searchTerm:string = '';
  wishlistData:string[] = [];

 ngOnInit(): void {
     this._EocdataService.grtAllProducts().subscribe({

      next:(response)=>{
         console.log(response);
        this.products=response.data;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
        this.pageSize = response.metadata.limit;


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

pageChange(event:any):void{


this._EocdataService.grtAllProducts(event).subscribe({

      next:(response)=>{
         console.log(response);
        this.products=response.data;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
        this.pageSize = response.metadata.limit;


      }
    });
}
fav(prodId:any):void{
  this._WishlistService.addToWishlist(prodId).subscribe({
    next:(response)=>{
      console.log(response);
      this._toastr.success(response.message);
      this.wishlistData = response.data

    }
  })
};
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
