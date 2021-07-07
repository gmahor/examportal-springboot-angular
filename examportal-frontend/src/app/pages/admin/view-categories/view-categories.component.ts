import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from './../../../services/category-service/category.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories: any = [

    // For testing
    // {
    //   cid: 21,
    //   title: "programming",
    //   description: "this is testing category"
    // },
    // {
    //   cid: 22,
    //   title: "asdasd",
    //   description: "this is asdas category"
    // },
    // {
    //   cid: 23,
    //   title: "gf",
    //   description: "this is testgfgfing category"
    // },
  ]

  cat: any = {

  }

  constructor(private _category: CategoryService, private snack: MatSnackBar, private route: Router) { }

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        console.log(error);
        Swal.fire({
          title: 'Error',
          text: 'Error loading data',
          icon: 'error',
          timer: 3000,
          showConfirmButton: false,
        });
      }
    );
  }

  // delete category
  public deleteCategory(catId: any) {
  Swal.fire({
    icon:'warning',
    title:'Delete Category',
    text:'Are Your Sure ? Want To Delete The Category...',
    confirmButtonText:'Delete',
    showCancelButton: true,
  }).then((result:any)=>{
    if (result.isConfirmed) {
      this._category.deleteCategory(catId).subscribe(
        (data) => {
          Swal.fire({
            text: 'Category Deleted Successfully...',
            icon: 'success',
            timer: 3000,
            showConfirmButton: false,
          }).then((e: any) => {
            setTimeout(function () { window.location.reload() });
          });
        },
        (error) => {
          Swal.fire({
            // title: 'error',
            text: 'Category Is Not Deleted...',
            icon: 'error',
            timer: 3000,
            showConfirmButton: false,
          });
        }
      );
    }
  });
  }


}
