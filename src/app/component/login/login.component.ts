import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy{
 constructor(private _AuthService:AuthService , private _Router:Router , private _FormBuilder:FormBuilder){}
  msgError:string = '';
  isLoading:boolean = false;
  loginSubscribe:Subscription = new Subscription;
  
  loginForm: FormGroup = this._FormBuilder.group({
    email: [null ,[Validators.required ,Validators.email] ],
    password: [null , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)] ]
  });

  handellogForm():void{

    if(this.loginForm.valid){

      this.isLoading= true;

      this._AuthService.setLogin(this.loginForm.value).subscribe(
        {
          next:(response)=>{
            console.log(response);
            if(response.message == "success"){
              localStorage.setItem('eToken' , response.token);//save token in local

              this._AuthService.saveData();//call fun in auth service to show token
              this.isLoading = false;
              this._Router.navigate(['/home' , ])
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
      this.loginForm.markAllAsTouched();
      //if user try to login without fillin data
    }

  }
  ngOnDestroy(): void {
      this.loginSubscribe.unsubscribe()
  }


}
