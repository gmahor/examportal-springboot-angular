import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  };

  hide = true;

  constructor(
    private snack: MatSnackBar,
    private loginservice: LoginService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  // submit form
  formSubmit() {
    console.log('login btn clicked');

    // validation for username
    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username == null
    ) {
      this.snack.open('Username is required', 'x', {
        duration: 3000,
      });
      return;
    }

    // validation for password
    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      this.snack.open('Password is required', 'x', {
        duration: 3000,
      });
      return;
    }

    // request to server to generate-token api
    this.loginservice.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('success');
        console.log(data);

        // login
        this.loginservice.loginUser(data.token);

        this.loginservice.getCurrentUser().subscribe(
          (userdata: any) => {
            console.log(userdata);
            this.loginservice.setUser(userdata);
            // redirect : if user is a ADMIN then admin-dashboard
            // redirect : if user is a USER then user-dashboard
            if (this.loginservice.getUserRole() == 'ADMIN') {
              //Admin Dashboard
              this.route.navigate(['admin']);
              this.loginservice.loginStatusSubject.next(true);
            } else if (this.loginservice.getUserRole() == 'NORMAL') {
              // User Dashboard
              this.route.navigate(['user']);
              this.loginservice.loginStatusSubject.next(true);
            } else {
              this.loginservice.logout();
            }
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        this.snack.open('Invalid Details !! Pls Try Again Later...', '', {
          duration: 3000,
        });
      }
    );
  }
}
