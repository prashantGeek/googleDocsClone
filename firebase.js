import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLJug4-E6L_ljNpUQG5dGn4nU0EI6fFhY",
  authDomain: "prashant-4ecab.firebaseapp.com",
  projectId: "prashant-4ecab",
  storageBucket: "prashant-4ecab.appspot.com",
  messagingSenderId: "729807880273",
  appId: "1:729807880273:web:0a51ad8d93743b6951b870",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
