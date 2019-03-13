import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBJmPD_xg8Yq7Ykad13D1h4IkWU6jF7o9o",
  authDomain: "prepcs-dfabe.firebaseapp.com",
  databaseURL: "https://prepcs-dfabe.firebaseio.com",
  projectId: "prepcs-dfabe",
  storageBucket: "prepcs-dfabe.appspot.com",
  messagingSenderId: "801387735743"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
    this.fs = app.firestore();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  getUid = () => { return this.auth.currentUser.uid; }

  // *** User API ***
  // We are using "Cloud Firestore", not "Realtime Database" 
  // user = uid => this.db.ref(`users/${uid}`);
  // users = () => this.db.ref('users');

  fs_users = () => this.fs.collection('users');

  fs_user = uid => this.fs.collection('users').doc(uid);

  fs_problems = () => this.fs.collection('problems');



}

export default Firebase;
