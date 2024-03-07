import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/interfaces/product';
import { EocdataService } from 'src/app/shared/services/eocdata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
constructor(private _EocdataService:EocdataService){}

categoryData:Category[]=[]

  ngOnInit(): void {
 this._EocdataService.getCategories().subscribe({
  next:(response)=>{
    this.categoryData = response.data
  }
 })
  }
}
