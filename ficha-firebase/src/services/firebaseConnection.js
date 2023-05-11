
import { initializeApp } from 'firebase/app'
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage';



const firebaseConfig = {
    apiKey: "AIzaSyD850Xfh03ONcHpeUGbijGlz5hMWUdkMow",
    authDomain: "fichacad-94e2c.firebaseapp.com",
    projectId: "fichacad-94e2c",
    storageBucket: "fichacad-94e2c.appspot.com",
    messagingSenderId: "661019843680",
    appId: "1:661019843680:web:5b1873926d31008aedb705",
    measurementId: "G-VPGG2TLW3Y"
  };
 
  const firebaseapp = initializeApp(firebaseConfig);
  const auth  = getAuth(firebaseapp);
  const db = getFirestore(firebaseapp)
  const storage = getStorage(firebaseapp)
  //const provider  = new GoogleAuthProvider();
  
  export {auth,db,storage}; // exportando para poder usar