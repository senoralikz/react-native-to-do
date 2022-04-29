// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpwfOnxaYq1OndoA5qgl-mTeVLTfTmG0U",
  authDomain: "to-do-or-not-to-do-208d8.firebaseapp.com",
  projectId: "to-do-or-not-to-do-208d8",
  storageBucket: "to-do-or-not-to-do-208d8.appspot.com",
  messagingSenderId: "981009136324",
  appId: "1:981009136324:web:a0567c0be080634b972791",
  measurementId: "G-80EW48KFCX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
