import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent {
  constructor(private _Router:Router){}

//هترجع اليوزر لصفحة الهوم لو هو مسجل دخول لو مش مسجل الجارد هيوديه لصفحة اللوجن
  navigateBack():void{
this._Router.navigate(['/home']);
  }
}
