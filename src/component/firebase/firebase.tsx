
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,GoogleAuthProvider} from "firebase/auth"

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyCTRGYP9cYpa-5pdHZVnue6NQSyPaSM2PU",
  authDomain: "firestoreproject-9f1a5.firebaseapp.com",
  projectId: "firestoreproject-9f1a5",
  storageBucket: "firestoreproject-9f1a5.appspot.com",
  messagingSenderId: "508748138171",
  appId: "1:508748138171:web:55a32faf0718baec898b9e",
  measurementId: "G-C7HRYFJVM8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();