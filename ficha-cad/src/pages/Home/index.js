import { useState } from "react";
import './home.css'
import { Button } from 'primereact/button';


import { Link } from 'react-router-dom' // importando o react router dom para acessar o register

import {auth} from '../../firebaseconect' // importar a autenticação do login 
import {signInWithEmailAndPassword} from 'firebase/auth' // importar para fazer o login

import {useNavigate} from 'react-router-dom' // é um hook do react router dom para poder fazer 
                                             // nevegações de forma indireta                    

 export default function Home(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate(); // usar o navigate para nevegar usuario
    
     async function handleLogin(e){
        e.preventDefault(); //  para ele não atualizar a pagina

        /// uma validação se os campos estiverem preenchidos ele acessa
        /// se não ele pede para voce preencher todos os campos
        if(email !== '' && password !== ''){
           await signInWithEmailAndPassword(auth, email, password) // passando o auth,email e password

            .then(() => {
                // navegar para o ADMIN
                navigate('admin', {replace:true})

            })
            .catch(() =>{
                console.log("erro ao fazer o login")
            })


        } else {
            alert("Preencha todos os campos")
        }





    }


    return(
        
        <div className="home-container">
            <h1>Cadrastro</h1>
            

            <form className="form" onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    /// toda vez que voce digitar agente recebe a nossa função anonima com um evento
                    /// setEmail para passar o valor para a useState do email oque vc digitar
                 />

                <input
                    type="password"
                    placeholder="***********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    /// toda vez que voce digitar agente recebe a nossa função anonima com um evento
                    /// setPassword para passar o valor para a useState da senha oque vc digitar
                 />

                <br></br>
                
                <Button label="Login" icon="pi pi-user" className="w-8rem mx-auto " type="submit"></Button>
                
               

            </form>
            

            <Link className="button-link" to='/register'>
            Não possui uma conta? Cadastre-se 
            </Link>


        </div>
    
    
    );
    
    
      
    }