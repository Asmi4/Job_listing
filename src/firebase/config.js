import app from 'firebase/app';
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyANhcR6g6P2oH6C515s8QghgkWsEySbxgA",
    authDomain: "job-listing-ea2ee.firebaseapp.com",
    projectId: "job-listing-ea2ee",
    storageBucket: "job-listing-ea2ee.appspot.com",
    messagingSenderId: "244857117483",
    appId: "1:244857117483:web:ede0b52ba159b39d18436e"
  };

  // Initialize Firebase
  const firebase = app.initializeApp(firebaseConfig);
  const firestore = firebase.firestore();

  export {firebaseConfig, firestore, app};