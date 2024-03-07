import { Component, OnInit, Renderer2 } from '@angular/core';
import { product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

constructor(private _CartService:CartService , private _Renderer2:Renderer2){}
cartProduct:any = {};

removeItem(id: string):void{
  this._CartService.removecartItem(id).subscribe({
    next: (response) => {
     this.cartProduct = response.data;  //مسكت الresponse.dataفي متغير عشان اللي يحصل فيها يسمع ف html
      console.log(response.data);

    },
    error:(err)=>{
      console.log(err);

    }
  })
}

ngOnInit(): void {
    this._CartService.getuserCart().subscribe({
      next:(response)=>{
        console.log(response.data);
        this.cartProduct = response.data;
      },
      error:(err)=>{
        console.log(err);

      }
    })
}

updateCount(id:string, count:number , el1:HTMLButtonElement , el2:HTMLButtonElement):void{
  if(count >= 1){
 this._Renderer2.setAttribute(el1 , 'disabled' , 'true');
 this._Renderer2.setAttribute(el2 , 'disabled' , 'true');
    this._CartService.updateCount(id , count).subscribe({
    next:(response)=> {

          console.log(response.data);
          this.cartProduct = response.data
          this._Renderer2.removeAttribute(el1 , 'disabled');
          this._Renderer2.removeAttribute(el2 , 'disabled');



    }
  })
  }
}

}
