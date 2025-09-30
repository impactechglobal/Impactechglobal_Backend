import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyANYPGhjzQJ_P7pk0G0P7o0iR8wQzR1w3w",
  authDomain: "impactechglobal.firebaseapp.com",
  projectId: "impactechglobal",
  storageBucket: "impactechglobal.firebasestorage.app",
  messagingSenderId: "830715175233",
  appId: "1:830715175233:web:98bc4d250f013d453ac1c0",
  measurementId: "G-1ZHVMJR4JQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;