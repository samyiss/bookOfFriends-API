// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtc49XjIBGrqKw_xT0mLGQZUHsP0r26qM",
  authDomain: "book-of-friends-6504d.firebaseapp.com",
  projectId: "book-of-friends-6504d",
  storageBucket: "book-of-friends-6504d.appspot.com",
  messagingSenderId: "83916011307",
  appId: "1:83916011307:web:e725ff576a8029553fb76e",
  measurementId: "G-YCRLW4162X"
};

// Initialize Firebase
exports.fapp = initializeApp(firebaseConfig);