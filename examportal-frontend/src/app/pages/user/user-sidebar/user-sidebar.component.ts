import { CategoryService } from './../../../services/category-service/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  categories:any;
  constructor(private _cat:CategoryService) { }

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data)=>{
        this.categories=data;
      },
      (error)=>{
        console.log(error);     
      }
    );
  }

}
