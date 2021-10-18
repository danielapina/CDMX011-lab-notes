import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDnpSNXYfDKKHXNSns6AD0w1Akmq5DAJhw",
  authDomain: "note-that.firebaseapp.com",
  projectId: "note-that",
  storageBucket: "note-that.appspot.com",
  messagingSenderId: "165534425727",
  appId: "1:165534425727:web:f4582439e10ec7444a154a"
  };
 initializeApp(firebaseConfig);
 export const auth = getAuth();
 export const db = getFirestore();


 

