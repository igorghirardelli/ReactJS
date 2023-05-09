import { initializeApp } from 'firebase/app'
import {getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth' // introduzindo autenticação no banco de dados firebase
const firebaseConfig = {
  apiKey: "AIzaSyClrE6JATQVrragwDPGScUjRG-j04lLRPA",
  authDomain: "banco-dados-a4964.firebaseapp.com",
  projectId: "banco-dados-a4964",
  storageBucket: "banco-dados-a4964.appspot.com",
  messagingSenderId: "385870882417",
  appId: "1:385870882417:web:b164692a7ede034563ddd0",
  measurementId: "G-P48DV5FVY8"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

export{ db,auth };
