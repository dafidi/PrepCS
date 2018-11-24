import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login = () => {
    this.authService.login(this.email, this.password);
    this.email = this.password = "";
  }

  signup = () => {
    this.authService.signup(this.email, this.password);
    this.email = this.password = "";
  }

  logout = () => {
    this.authService.logout();
  }


}
