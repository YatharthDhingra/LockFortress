// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCs1Z8xwoxAHz2R6-RzZ3ASNjS_iWY5ePQ",
    authDomain: "otp-auth-58316.firebaseapp.com",
    projectId: "otp-auth-58316",
    storageBucket: "otp-auth-58316.appspot.com",
    messagingSenderId: "65759643173",
    appId: "1:65759643173:web:abab311f8b4fe3439ba1cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
