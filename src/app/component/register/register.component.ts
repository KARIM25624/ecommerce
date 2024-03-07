import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy{
  constructor(private _AuthService:AuthService , private _Router:Router , private _FormBuilder:FormBuilder){}
  msgError:string = '';
  isLoading:boolean = false;
  registerSubscribe:Subscription = new Subscription;


  registerForm: FormGroup = this._FormBuilder.group({
    name      : ['' , [Validators.required ,Validators.minLength(3) ,Validators.maxLength(20)] ],
    email     : ['' , [Validators.required ,Validators.email]],
    password  : ['' , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]],
    rePassword: ['' ],
    phone     : ['' , [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],

  } , {validators:[this.confirmPassword]});

confirmPassword(group:FormGroup):void{
  const password = group.get('password');
  const rePassword = group.get('rePassword');
  if(password?.value != rePassword?.value){
      rePassword?.setErrors({notequal:true})
  }
  if(rePassword?.value == '' || rePassword?.value == null){
    rePassword?.setErrors({required:true})
  }
}



  handelForm():void{

    if(this.registerForm.valid){

      this.isLoading= true;

      this._AuthService.setRegister(this.registerForm.value).subscribe(
        {
          next:(response)=>{
            console.log(response);
            if(response.message == "success"){
              this.isLoading = false;
              this._Router.navigate(['/login' , ])
            }

          },
          error:(err:HttpErrorResponse)=>{
            this.isLoading = false;
            this.msgError = err.error.message;

          }
        }
      )
    }
    else{
      this.registerForm.markAllAsTouched()
    }

  }
  ngOnDestroy(): void {
      this.registerSubscribe.unsubscribe()
  }
}
