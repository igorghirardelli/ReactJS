import { initializeApp } from 'firebase/app'
import {getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth' // introduzindo autenticação no banco de dados firebase
const firebaseConfig = {
    apiKey: "AIzaSyD6EW3DDMlBHJWWGT5P7IGaZvwIg8t92Rw",
    authDomain: "curso-22227.firebaseapp.com",
    projectId: "curso-22227",
    storageBucket: "curso-22227.appspot.com",
    messagingSenderId: "300279260712",
    appId: "1:300279260712:web:5294b27576b036f932b71d",
    measurementId: "G-MHYZ6WKNKT"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

export{ db,auth };
