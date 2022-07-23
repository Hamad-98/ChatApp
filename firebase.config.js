import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBcdmrDCRWMlwkdr5DKIApeysFXgFQGMAY",
  authDomain: "whatsapp-2-b6803.firebaseapp.com",
  projectId: "whatsapp-2-b6803",
  storageBucket: "whatsapp-2-b6803.appspot.com",
  messagingSenderId: "881580595713",
  appId: "1:881580595713:web:8f4c59488d0af64ec37e00",
};

const app = !firebase.app.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
