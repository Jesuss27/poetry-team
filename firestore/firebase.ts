// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use

// Google Authenication
import { GoogleAuthProvider, getAuth } from "firebase/auth";

export const provider = new GoogleAuthProvider();

// Firestore imports
import {getFirestore , collection} from 'firebase/firestore'


// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB--7HlJP-D8DdCN7bHrvIMLwLY7NZYrhA",
  authDomain: "poetry-team.firebaseapp.com",
  projectId: "poetry-team",
  storageBucket: "poetry-team.appspot.com",
  messagingSenderId: "822907508630",
  appId: "1:822907508630:web:558f1f8a58b7beade4afb7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Database

const db = getFirestore(app)

export const usersCollectionRef = collection(db,'users')

// Initialize Authentication

export const auth = getAuth()

