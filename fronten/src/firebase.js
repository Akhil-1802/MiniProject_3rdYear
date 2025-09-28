// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC71mroU-igV8IsQcLIVLiYgTLloZRDEwc",
  authDomain: "finvisionai-c2cc9.firebaseapp.com",
  projectId: "finvisionai-c2cc9",
  storageBucket: "finvisionai-c2cc9.firebasestorage.app",
  messagingSenderId: "867193371138",
  appId: "1:867193371138:web:7316ca955b9b759a86451b",
  measurementId: "G-JVNCSGB8F5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);