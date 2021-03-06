import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['../../prepcs.css']
})
export class UserLoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login = () => {
    this.authService.login(this.email, this.password)
    .then(response => {
      console.log(response);
      if (response) {
        this.router.navigate(['home']);
      } else {
        /**
         * We should do something here to let the user know that their login
         * has failed.
         */
      }
    }).catch(error => {
      console.log(error);
    });
    this.email = this.password = "";
  }

  signup = () => {
    this.authService.signup(this.email, this.password);
    this.email = this.password = "";
  }

  logout = () => {
    this.authService.logout();
  }

  // 
}
