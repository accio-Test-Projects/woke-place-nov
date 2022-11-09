// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    //change these to your own firebase config
  apiKey: "AIzaSyCvC7OJ7SWpHD0qWlfZ9tfgfNI27PE9hWA",
  authDomain: "work-place-nov.firebaseapp.com",
  projectId: "work-place-nov",
  storageBucket: "work-place-nov.appspot.com",
  messagingSenderId: "263672880771",
  appId: "1:263672880771:web:0205563dfd8f52b75645b6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
