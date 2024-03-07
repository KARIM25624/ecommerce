import { authGuard } from './core/auth.guard';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './component/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './component/auth-layout/auth-layout.component';
import { HomeComponent } from './component/home/home.component';
import { CartComponent } from './component/cart/cart.component';
import { ProductsComponent } from './component/products/products.component';
import { DetailsComponent } from './component/details/details.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { BrandsComponent } from './component/brands/brands.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { PaymentComponent } from './component/payment/payment.component';
import { AllordersComponent } from './component/allorders/allorders.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { CatdetailsComponent } from './component/catdetails/catdetails.component';
import { WishlistComponent } from './component/wishlist/wishlist.component';

const routes: Routes = [
  //blank[home,card,brands,.....]
  {path:'',canActivate:[authGuard],
   component:BlankLayoutComponent
   , children:[
    {path:'', redirectTo: 'home' , pathMatch:'full' },
    {path: 'home', component:HomeComponent},
    {path: 'allorders', component:AllordersComponent},
    {path: 'cart', component:CartComponent},
    {path: 'products', component:ProductsComponent},
    {path: 'wishlist', component:WishlistComponent},
    {path: 'details/:id', component:DetailsComponent},
    {path: 'categories', component:CategoriesComponent},
    {path: 'catdetails/:id', component:CatdetailsComponent},
    {path: 'brands', component:BrandsComponent},
    {path: 'payment/:id', component:PaymentComponent},
    {path: 'forget-password', component:ForgetPasswordComponent},

  ],

  },
  //authuntication[login,register]
  {path:'',
   component:AuthLayoutComponent,
    children:[
    {path: 'login', component:LoginComponent},
    {path: 'register', component:RegisterComponent},
    {path: 'forget-password', component:ForgetPasswordComponent},
  ],
},
//not found page if path has any error
{path: '**', component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
