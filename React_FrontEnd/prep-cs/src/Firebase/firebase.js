import app from 'firebase/app';
import 'firebase/auth';

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
  }

  doCreateUserWithEmailAndPassword = (email, password) => 
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () =>  this.auth.signOut(); 
  
}

export default Firebase;
