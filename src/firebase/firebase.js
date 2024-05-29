import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzschW8qMjZ2cSgkxeuOTB1Hu_Fd1Qc5I",
  authDomain: "authentication-29157.firebaseapp.com",
  projectId: "authentication-29157",
  storageBucket: "authentication-29157.appspot.com",
  messagingSenderId: "78410387845",
  appId: "1:78410387845:web:c274f84bcebe7768b174ec",
  measurementId: "G-K4Q1S7DX3T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth,db}





