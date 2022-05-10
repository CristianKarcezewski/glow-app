import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIP8t2P7CWthvCdhCsLJrB6KfZ-lgnY14",
  authDomain: "glow-service.firebaseapp.com",
  projectId: "glow-service",
  storageBucket: "glow-service.appspot.com",
  messagingSenderId: "269940628436",
  appId: "1:269940628436:web:d8e9bb83efc7f3c0ca9441",
};
export default getAuth(initializeApp(firebaseConfig));
