import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { CartComponent } from './component/cart/cart.component';
import { ProductsComponent } from './component/products/products.component';
import { BrandsComponent } from './component/brands/brands.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { FooterComponent } from './component/footer/footer.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { DetailsComponent } from './component/details/details.component';
import { NavBlankComponent } from './component/nav-blank/nav-blank.component';
import { NavAuthComponent } from './component/nav-auth/nav-auth.component';
import { AuthLayoutComponent } from './component/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './component/blank-layout/blank-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TermtextPipe } from './termtext.pipe';
import { SearchPipe } from './search.pipe';
import { ToastrModule } from 'ngx-toastr';
import { PaymentComponent } from './component/payment/payment.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { AllordersComponent } from './component/allorders/allorders.component';
import { MyhttpInterceptor } from './myhttp.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { CatdetailsComponent } from './component/catdetails/catdetails.component';
import { WishlistComponent } from './component/wishlist/wishlist.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    BrandsComponent,
    CategoriesComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    DetailsComponent,
    NavBlankComponent,
    NavAuthComponent,
    AuthLayoutComponent,
    BlankLayoutComponent,
    TermtextPipe,
    SearchPipe,
    PaymentComponent,
    AllordersComponent,
    ForgetPasswordComponent,
    CatdetailsComponent,
    WishlistComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    CarouselModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS , useClass:MyhttpInterceptor , multi:true},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
