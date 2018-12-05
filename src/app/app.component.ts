import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./prepcs.css']
})
export class AppComponent {
  title = 'app';
  constructor(private authService: AuthService) {
  }
  
  logout = () => {
    this.authService.logout();
  }
}
