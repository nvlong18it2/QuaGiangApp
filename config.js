import * as firebase from 'firebase';
// const firebase = require("firebase");
// require("firebase/firestore");
const FirebaseKeys = {
    apiKey: "AIzaSyDGemN4EzZ9EtZdABgQURyVKFYjZDeDsCM",
    authDomain: "socialapp-b8954.firebaseapp.com",
    databaseURL: "https://socialapp-b8954.firebaseio.com",
    projectId: "socialapp-b8954",
    storageBucket: "socialapp-b8954.appspot.com",
    messagingSenderId: "951286997417",
    appId: "1:951286997417:web:6627faff57e099952aa4b8"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseKeys);
  }

export default firebase;                