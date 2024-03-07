import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgetService } from 'src/app/shared/services/forget.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  constructor( private _ForgetService:ForgetService , private _Router:Router){}
step1:boolean = true;
step2:boolean = false;
step3:boolean = false;
email:string = '';
userMsg:string = '';
forgetForm: FormGroup = new FormGroup({
  email: new FormControl(null , Validators.required)
});

resetcode: FormGroup = new FormGroup({
  resetCode: new FormControl(null , Validators.required)
});
resetpassword: FormGroup = new FormGroup({

  npassword: new FormControl(null , Validators.required),

});
forgetPassword():void{
  let userEamil = this.forgetForm.value;
  this.email = userEamil.email;
  this._ForgetService.forgetPassword(userEamil).subscribe({
    next:(Response)=>{
      console.log(Response);
      this.userMsg = Response.message;
      this.step1 = false;
      this.step2 = true;
    },
    error:(err)=>{
      this.userMsg= err.error.message
    }
  })
};
resetCode():void{
  let resetCode = this.resetcode.value;
this._ForgetService.resetCode(resetCode).subscribe({
  next:(response)=>{
    this.userMsg = response.status;
    this.step2 = false;
    this.step3 = true;

  },
  error:(err)=>{
    this.userMsg =err.console.error.message;

  }
})
};
Rpassword():void{
  let rePasswordForm = this.resetpassword.value;
  rePasswordForm.email = this.email;
this._ForgetService.resetPass(rePasswordForm).subscribe({
  next:(response)=>{
    if(response?.token){
      localStorage.setItem('token', response.token);
      this._Router.navigate(['/home'])
    }
  }
})
}
}
