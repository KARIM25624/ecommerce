import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent {
  constructor(private _AuthService:AuthService ,private _Renderer2:Renderer2){}

  @ViewChild('navbar') navElement!:ElementRef

  @HostListener( 'window:scroll' )
  onScroll():void{
    if(scrollY > 50){
      this._Renderer2.addClass(this.navElement.nativeElement , 'fixed-top');
      this._Renderer2.addClass(this.navElement.nativeElement , 'px-3');
      this._Renderer2.addClass(this.navElement.nativeElement , 'shadow');

    }
    else{
      this._Renderer2.removeClass(this.navElement.nativeElement , 'fixed-top');
      this._Renderer2.removeClass(this.navElement.nativeElement , 'px-3');
      this._Renderer2.removeClass(this.navElement.nativeElement , 'shadow');
    }
  }

  logout():void{
    //remove tokem from localstorage
    //navigato
    this._AuthService.signout();
  }

}
