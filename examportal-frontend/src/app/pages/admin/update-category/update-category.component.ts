import { CategoryService } from 'src/app/services/category-service/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { timer } from 'rxjs';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  cId: any;

  category: any;

  constructor(private _route: ActivatedRoute, private _cat: CategoryService,private _router:Router) { }

  ngOnInit(): void {
    this.cId = this._route.snapshot.params.cid;
    this._cat.getCategory(this.cId).subscribe(
      (data)=>{
        this.category = data;
      },
      (error)=>{
        console.log(error);      
      }
    );
  
  }

  formSubmit(){
    this._cat.updateCategory(this.category).subscribe(
      (data)=>{
        Swal.fire({
          icon:'success',
          text:'Category Updated Successfully..',
          showConfirmButton:false,
          timer:3000
        }).then((result:any)=>{
          this._router.navigate(['admin/view-category']);
        });
      },
      (error)=>{
        console.log(error);
      }
    );
  }

}
