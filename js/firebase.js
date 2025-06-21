// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDx3cOOHqIJZeF4OGqooRvpMkKIKAVHM4w",
  authDomain: "todolist-3b3cf.firebaseapp.com",
  projectId: "todolist-3b3cf",
  storageBucket: "todolist-3b3cf.firebasestorage.app",
  messagingSenderId: "1069253702928",
  appId: "1:1069253702928:web:5c343f2885795bf8a7e195",
  measurementId: "G-J247RL482M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);