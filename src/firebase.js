
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GithubAuthProvider, getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "gitfolio-679e8.firebaseapp.com",
  projectId: "gitfolio-679e8",
  storageBucket: "gitfolio-679e8.appspot.com",
  messagingSenderId: "423030034063",
  appId: "1:423030034063:web:b2ab34e1cc299f38022afa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const githubProvider = new GithubAuthProvider();
export const auth = getAuth(app);

export default db;