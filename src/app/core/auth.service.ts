import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;
  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = firebaseAuth.authState;
  }

  signup = (email: string, password: string) => {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        console.log("Signup successful: ", response);
      })
      .catch(error => {
        console.log("Signup failed: ", error)
      }); 
  }

  login = (email: string, password: string) => {
    return this.firebaseAuth
    .auth
    .signInWithEmailAndPassword(email, password)
    .then(response => { 
      console.log("login successful:", response);
    })
    .catch(error => { console.log("login failed:", error)});
  }

  logout = () => {
    this.firebaseAuth.auth.signOut();
    this.router.navigate(['login']);
  }

  isLoggedIn = () => {
    return this.firebaseAuth.auth.currentUser != null;
  }
}
