import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from './../../../services/category-service/category.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category = {
    title: "",
    description: ""
  }


  constructor(private categoryService: CategoryService, private snack: MatSnackBar, private route: Router) { }

  ngOnInit(): void {
  }

  public formSubmit() {

    // validation
    if (this.category.title.trim() == '' || this.category.title == null) {
      this.snack.open("title can't be null...", "", {
        duration: 2000,
      });
      return;
    }

    if (this.category.description.trim() == '' || this.category.description == null) {
      this.snack.open("description can't be null...", "", {
        duration: 2000,
      });
      return;
    }


    this.categoryService.addCategory(this.category).subscribe(
      (data: any) => {
        this.route.navigate(['admin/view-category']);
        Swal.fire({
          title: "Category Added Successfully...",
          icon: "success",
          timer: 3000,
          showConfirmButton:false,
        });
      },
      (error) => {
        console.log(error);
        Swal.fire({
          title: "Category Is Not Added...",
          icon: "error",
          timer: 3000,
          showConfirmButton:false,
        });
      }
    );







  }



}
