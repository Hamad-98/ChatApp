import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcdmrDCRWMlwkdr5DKIApeysFXgFQGMAY",
  authDomain: "whatsapp-2-b6803.firebaseapp.com",
  projectId: "whatsapp-2-b6803",
  storageBucket: "whatsapp-2-b6803.appspot.com",
  messagingSenderId: "881580595713",
  appId: "1:881580595713:web:8f4c59488d0af64ec37e00",
};

// Initialize Firebase
// links our code with the online firebase console
const app = initializeApp(firebaseConfig);

// grabs the database from the firebase console
export const db = getFirestore(app);

// grabs authetnciation informatino from firebase app
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
