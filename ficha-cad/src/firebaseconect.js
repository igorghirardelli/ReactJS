import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

import { getAuth } from 'firebase/auth' // introduzindo autenticação no banco de dados firebase
const firebaseConfig = {
  apiKey: "AIzaSyBN2RUo73PnFXoSKnmO1YPB0LPA21mFfRw",
  authDomain: "fichapp2.firebaseapp.com",
  projectId: "fichapp2",
  storageBucket: "fichapp2.appspot.com",
  messagingSenderId: "176200944859",  
  appId: "1:176200944859:web:bfa34c78a47939516290fe",
  measurementId: "G-QKRKYY9ETJ"
};
const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

export{ db,auth };