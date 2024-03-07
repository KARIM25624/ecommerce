import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from 'src/app/shared/interfaces/product';
import { EocdataService } from 'src/app/shared/services/eocdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{

constructor(private _ActivatedRoute:ActivatedRoute , private _EocdataService:EocdataService , private _CartService:CartService){}

detailsSlider: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    items:1,
    navText: ['', ''],
    // responsive: {
    //   0: {
    //     items: 1
    //   },
    //   400: {
    //     items: 2
    //   },
    //   740: {
    //     items: 3
    //   },
    //   940: {
    //     items: 4
    //   }
    // },
    nav: true
  }

  productDetails:product = {} as product;
ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) =>
      {
        let idProduct:any = params.get('id');

        this._EocdataService.getDetails(idProduct).subscribe({
          next:(Response)=>
          {
          this.productDetails =  Response.data;
          }
        })
      }
    })
}

addCart(id:string):void{
  this._CartService.addProductToCart(id).subscribe({
    next:(responseCart)=>{
      console.log(responseCart);

    },
    error:(err)=>{
      console.log(err);

    }
  })
}

}




