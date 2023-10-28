// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getStorage } from "@firebase/storage";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCeI8ETmDRnIlfboL58NOcSa70GIvUQ7iQ",
    authDomain: "share-ee81b.firebaseapp.com",
    projectId: "share-ee81b",
    storageBucket: "share-ee81b.appspot.com",
    messagingSenderId: "1050870637842",
    appId: "1:1050870637842:web:509b6b6007f08bf25bbfcb",
    measurementId: "G-3LGLKFR7SS"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const storage = getStorage();
 
const auth = firebase.auth(); //returns an instance of the Firebase Authentication service.

export { auth, storage, firebaseApp };