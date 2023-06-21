// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTKI7W_oIt7dmuo5UImQiWqeGBPR-4pvA",
  authDomain: "nocode-eba9d.firebaseapp.com",
  projectId: "nocode-eba9d",
  storageBucket: "nocode-eba9d.appspot.com",
  messagingSenderId: "22867901376",
  appId: "1:22867901376:web:c14b983592ebd43342a625",
  measurementId: "G-K45EDQKM6C"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const db=getFirestore()
export const storage = getStorage();