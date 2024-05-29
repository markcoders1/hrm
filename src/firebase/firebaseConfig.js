import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, collection, onSnapshot, doc, setDoc, query, where, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { getStorage, ref, deleteObject, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDzschW8qMjZ2cSgkxeuOTB1Hu_Fd1Qc5I",
    authDomain: "authentication-29157.firebaseapp.com",
    projectId: "authentication-29157",
    storageBucket: "authentication-29157.appspot.com",
    messagingSenderId: "78410387845",
    appId: "1:78410387845:web:c274f84bcebe7768b174ec",
    measurementId: "G-K4Q1S7DX3T"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth();

export {
    db, collection, onSnapshot, doc, deleteDoc, storage, deleteObject, ref, setDoc, uploadBytesResumable, getDownloadURL, updateDoc, query, where, signInWithEmailAndPassword, auth
}