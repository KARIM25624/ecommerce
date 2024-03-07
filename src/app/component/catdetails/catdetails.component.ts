import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/shared/interfaces/product';
import { EocdataService } from 'src/app/shared/services/eocdata.service';

@Component({
  selector: 'app-catdetails',
  templateUrl: './catdetails.component.html',
  styleUrls: ['./catdetails.component.css']
})
export class CatdetailsComponent implements OnInit{
 constructor(private _ActivatedRoute:ActivatedRoute , private _EocdataService:EocdataService){}
 categoryId:string| null = '';
 categorydetails:Category = {} as Category
 ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
    this.categoryId=  params.get('id')
    }
  });

  this._EocdataService.catDetails(this.categoryId).subscribe({
    next:(response)=>{
      this.categorydetails = response.data

    }
  })


    }
  }
