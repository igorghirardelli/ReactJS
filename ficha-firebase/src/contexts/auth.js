
import {useState,createContext,useEffect} from "react";
import {auth,db} from '../services/firebaseConnection'
import {createUserWithEmailAndPassword,signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth' // criar e logar usuario
import {doc, getDoc, setDoc} from 'firebase/firestore'


import {useNavigate} from 'react-router-dom' /// navegação entre as paginas quando eu criar a conta ele ja entrar no dashboard

import {toast} from 'react-toastify'

export const AuthContext = createContext({});

   function AuthProvider({ children }){
    const [user,setUser] = useState(null) // não tem usuario logado
    const [loadingAuth, setLoadingAuth] = useState(false); // 

    const navigate = useNavigate();

    async function signIn(email,password){
        
        setLoadingAuth(true);
        
         await signInWithEmailAndPassword(auth,email,password)
        .then( async(value)=>{
            let uid = value.user.uid;


            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef)

            let data = {
              uid: uid,
              nome: docSnap.data().nome,
              email:value.user.email,
              avatarURL: docSnap.data().avatarURL
            }
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success("Bem vindo(a) de volta!")
            navigate("/dashboard")

        })
        .catch((error)=>{
          console.log(error)
          setLoadingAuth(false);
          toast.error("Ops algo deu errado!")
        })


    }

    async function signInWithGoogle() {
      setLoadingAuth(true);
      signInWithPopup(auth, new GoogleAuthProvider())
          .then(async (value) => {
              const user = value.user;
              const userData = {
                  'id': user.uid,
                  'name': user.displayName,
                  'avatarUrl': user.photoURL,
                  'email': user.email,
              };

              await setDoc(doc(db, "users", user.uid), userData)
                  .then(() => {
                      setUser(userData);
                      storageUser(userData);
                      toast.success("Bem vindo(a) de volta!")
                      navigator('/dashboard');
                  });
          }).catch((error) => {
        console.log(error);
        setLoadingAuth(false);
      })
  }



    


    // Cadrastar um novo usuario
   async function signup(email,password,name){
      setLoadingAuth(true);

      await createUserWithEmailAndPassword(auth, email, password)

      .then( async(value)=> {
          let uid = value.user.uid

          await setDoc(doc(db,"users",uid),{
            nome: name,
            avatarURL:null
          })
          .then(() => {
           let data = {
            uid: uid,
            nome: name,
            email: value.user.email,
            avatarURL: null

           };

           setUser(data);
           storageUser(data);
            setLoadingAuth(false);
            //toast.success("Seja bem vindo ao sistema!")
            navigate("/")
          })


      })
      .catch((error) => {
        console.log(error);
        setLoadingAuth(false);
      })

    }

    function storageUser(data){
        localStorage.setItem('@fichaPRO',JSON.stringify(data))
    }

    async function logout(){
      await signOut(auth);
      localStorage.removeItem('@fichaPRO');
      setUser(null);
    }

    return(
        <AuthContext.Provider 
      value={{
        signed: !!user,
        user,
        signIn,
        signInWithGoogle,
        signup,
        logout,
        loadingAuth,
        storageUser,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
    
}

export default AuthProvider;