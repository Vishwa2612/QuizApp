import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOcdK3vHvqAe3as9bqV6EtVixQGbXj1wo",
  authDomain: "quizapp-cc5de.firebaseapp.com",
  projectId: "quizapp-cc5de",
  storageBucket: "quizapp-cc5de.appspot.com",
  messagingSenderId: "526128409502",
  appId: "1:526128409502:web:424a8f718d319e66f0c48f"
};
 
const app = initializeApp(firebaseConfig);
export const auth = getAuth(); 
export const db = getFirestore(app);