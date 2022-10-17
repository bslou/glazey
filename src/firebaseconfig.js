// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZbeopbiyNpJCiDUOXdDlsetMf9KYtAgM",
  authDomain: "glazey-84676.firebaseapp.com",
  projectId: "glazey-84676",
  storageBucket: "glazey-84676.appspot.com",
  messagingSenderId: "953826426997",
  appId: "1:953826426997:web:69e45795be4e893ad6783c",
  measurementId: "G-SHKLDP6H6C",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { auth, db, storage };
