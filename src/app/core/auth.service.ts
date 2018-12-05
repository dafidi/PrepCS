import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;
  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = firebaseAuth.user;
  }

  signup = (email: string, password: string) => {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        /**
         * We should display a "successful sign-up" message.
         */
      })
      .catch(error => {
        /**
         * We should display a failed sign-up message.
         */
      }); 
  }

  login = (email: string, password: string) => {
    return this.firebaseAuth
    .auth
    .signInWithEmailAndPassword(email, password)
    .then(
      /**
       * We only need to return false here. Caller should interpret return callback
       * as login successful if true unsuccessful if false.
       */
      response => {
      return true;
    })
    .catch(error => {
      return false;
    });
  }

  logout = () => {
    this.firebaseAuth.auth.signOut();
    this.router.navigate(['login']);
  }

  isLoggedIn = () => {
    return this.user != null;
  }
}
