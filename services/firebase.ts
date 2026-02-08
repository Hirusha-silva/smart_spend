// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1d5U7kGZqOpYtIQdVF3r4pQfkZ-J0bGQ",
  authDomain: "smart-spend-8cf03.firebaseapp.com",
  projectId: "smart-spend-8cf03",
  storageBucket: "smart-spend-8cf03.firebasestorage.app",
  messagingSenderId: "755060361171",
  appId: "1:755060361171:web:88823467f36aad07a51126"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app)
export const db = getFirestore(app)