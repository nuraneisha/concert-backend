// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBVtcOVL8J-Wyp8NpgO7uzgKBtymkRDX6o",
    authDomain: "concert-e0d5c.firebaseapp.com",
    projectId: "concert-e0d5c",
    storageBucket: "concert-e0d5c.firebasestorage.app",
    messagingSenderId: "719079803851",
    appId: "1:719079803851:web:c15a10fd5f531447af044e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);