import { useState, useEffect } from "react";

import {auth} from '../firebaseconect'
import {onAuthStateChanged} from 'firebase/auth' // verificar se tem usuario logado ou nao

import { Navigate } from 'react-router-dom'

export default function Private({ children }){
    const[loading, setLoading]  = useState(true); // começa true pq ele começa carregando até saber se tem usuario ou nao
    const[signed, setSigned] = useState(false); // começa false pra verificar se o usuario esta logado ou nao

    useEffect(() => {
        async function checkLogin(){
            const unsub = onAuthStateChanged(auth, (user) => {   // se tiver usuario ele executa
                // se tem usuario logado
                if(user){
                  const userData = {
                    uid: user.uid,
                    email:user.email,
                  }

                  localStorage.setItem("@detailUser", JSON.stringify(userData))

                  setLoading(false);
                  setSigned(true); //  tem usuario
                    
                } else {
                 // não possui usuario logado
                   setLoading(false); 
                   setSigned(false); 
                }
            })
        }
        checkLogin();
    }, [])

    if(loading){
        return(
            <div></div>
        )
    }
    if(!signed){
        return <Navigate to="/" />
    }


    return children;
}