// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAxHkuMO5DUFodi0iBJI2mqDIKIyP6Wx9k",
    authDomain: "chores-app-f6499.firebaseapp.com",
    projectId: "chores-app-f6499",
    storageBucket: "chores-app-f6499.firebasestorage.app",
    messagingSenderId: "336478453183",
    appId: "1:336478453183:web:aae9c32e81785726e1f50a",
    measurementId: "G-1346VWJNBD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app)