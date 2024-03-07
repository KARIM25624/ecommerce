import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/shared/interfaces/product';
import { EocdataService } from 'src/app/shared/services/eocdata.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit{
constructor(private _EocdataService:EocdataService){}

brandData:Brand[]=[];

  ngOnInit(): void {
 this._EocdataService.getBrands().subscribe({
  next:(response)=>{
    console.log(response);
    this.brandData =response.data
  }
 })
  }
}
