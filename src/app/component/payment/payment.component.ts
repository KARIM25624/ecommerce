import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{

constructor(private _FormBuilder:FormBuilder ,
   private _ActivatedRoute:ActivatedRoute,
   private _CartService:CartService){}

cartid :any='';

ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.cartid = params.get('id');

      }
    })
}
checkout:FormGroup = this._FormBuilder.group({
  details :[null , [Validators.required ,Validators.minLength(3)]],
  phone:[null , [Validators.required , Validators.pattern(/^01[1205][0-9]{8}$/)]],
  city: [null , [Validators.required]]
});

handelForm():void{
  console.log(this.checkout.value);
  this._CartService.checkout(this.cartid , this.checkout.value).subscribe({
    next:(reponsee)=>{
      if(reponsee.status == 'success'){
        window.open(reponsee.session.url , '_self')
      }

    }
  })

}
}
