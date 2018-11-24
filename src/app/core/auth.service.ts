import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;
  constructor(private firebaseAuth: AngularFireAuth) {
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
    this.firebaseAuth
    .auth
    .signInWithEmailAndPassword(email, password)
    .then(response => { console.log("login successful:", response)})
    .catch(error => { console.log("login failed:", error)});
  }

  logout = () => {
    this.firebaseAuth.auth.signOut();
  }

  isLoggedIn = () => {
    return this.firebaseAuth.auth.currentUser != null;
  }
}
