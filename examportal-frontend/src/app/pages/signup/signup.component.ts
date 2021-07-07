import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  public user = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
  };

  ngOnInit(): void {}

  // user define
  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      this.snackBar.open('User is required !!', 'x', {
        duration: 3000,
      });
      return;
    }

    // adduser  : userservice
    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire({
          title: "Successfully done !! "+'User id is '  + data.id,
          icon: 'success',
          timer: 3000,
        });
      },
      (error) => {
        console.log(error);
        this.snackBar.open('something went wrong..', 'x', {
          duration: 3000,
        });
      }
    );
  }
}
