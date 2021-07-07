import { LoginService } from './../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn:any = false;
  user:any = null;

  constructor(
    public loginservice: LoginService,
    private route: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {

    this.isLoggedIn = this.loginservice.isLoggedIn();
    this.user = this.loginservice.getUser();
    this.loginservice.loginStatusSubject.asObservable().subscribe((data)=>{
      this.isLoggedIn = this.loginservice.isLoggedIn();
      this.user = this.loginservice.getUser();
    });

  }

  public logout() {
    this.loginservice.logout();
    window.location.reload();
    this.snack.open('You Are Successfully Logout', '', {
      duration: 3000,
    });
  }
}
