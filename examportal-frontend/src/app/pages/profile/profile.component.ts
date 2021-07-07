import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user:any = null;

  constructor(private loginservice: LoginService) {}

  ngOnInit(): void {
    this.user = this.loginservice.getUser();

    // this.loginservice.getCurrentUser().subscribe(
    //   (data:any)=>{
    //     this.user = data;
    //   },
    //   (error)=>{
    //     console.log(error);
    //     console.log("something went wrong..");
    //   }
    // );

  }

}
