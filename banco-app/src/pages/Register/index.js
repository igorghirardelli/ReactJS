import { useState } from "react";



import { Link } from 'react-router-dom' // importando o react router dom para acessar o home
import {auth} from '../../firebaseconect' // importando o firebase
import {createUserWithEmailAndPassword} from 'firebase/auth' // importando para criar user e senha
import {useNavigate} from 'react-router-dom'


export default function Register(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    async function handleRegister(e){ // usar o async para ele esperar o cadrasto para poder prosseguir
        e.preventDefault(); //  para ele não atualizar a pagina

        /// uma validação se os campos estiverem preenchidos ele acessa
        /// se não ele pede para voce preencher todos os campos
        if(email !== '' && password !== ''){
            await createUserWithEmailAndPassword(auth, email, password) // para fazer o cadrasto

            .then(() =>  {
                navigate('/admin', {replace:true })
            })
            .catch(() => {
                console.log("erro ao fazer login")
            })

        } else {
            alert("Preencha todos os campos")
        }





    }


    return(
        
        <div className="home-container">
            <h1>Cadastre-se</h1>
            <span>Vamos criar sua conta!</span>

            <form className="form" onSubmit={handleRegister}>
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


                <button type="submit" >Registrar</button>


            </form>

            <Link className="button-link" to='/'>
            Já possui uma conta? Faça o login !
            </Link>


        </div>
    
    
    );
    
    
      
    }