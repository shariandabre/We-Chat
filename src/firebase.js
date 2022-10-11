// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider,getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "whatsapp3-fa869.firebaseapp.com",
  projectId: "whatsapp3-fa869",
  storageBucket: "whatsapp3-fa869.appspot.com",
  messagingSenderId: "720574081153",
  appId: "1:720574081153:web:b2782bf0b8c3b446590580"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
 const db = getFirestore();
export{app,auth,storage,db}

