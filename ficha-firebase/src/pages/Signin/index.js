import {useState,useContext} from 'react' // use context para consumir os contextos
import './signin.css'
//import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';



import logo from '../../assets/gato-preto-2.jpg'
import { Link } from 'react-router-dom'
import {AuthContext} from '../../contexts/auth'

export default  function Signin(){

        const [email,setEmail]  = useState('');
        const [password,setPassword] = useState('');

        const { signIn, loadingAuth,signInWithGoogle } = useContext(AuthContext)
        
    async function handleSignIn(e){
        e.preventDefault();
       

        if(email !== '' && password !== '' ){
          await  signIn(email,password);
        }
    }
    async function handleSignInWithGoogle() {
        await signInWithGoogle().catch((err) => {
            Toast.current.show({ severity: 'error', summary: 'Erro', detail: `${err}`, life: 2000 });
        })
    }


    return(
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt='Logo do sistema de chamadas' />
                </div>
            

            <form onSubmit={handleSignIn}>
                <h1>Entrar</h1>
                <input
                 type='text'  
                 placeholder='igor@teste.com' 
                 value={email}
                 onChange={(e)=> setEmail(e.target.value) }
                />
                
                <input
                 type='password'  
                 placeholder='*******' 
                 value={password}
                 onChange={(e)=> setPassword(e.target.value) }
                />

                
             <button type='submit'>
                {loadingAuth ? "Carregando..." : "Acessar" }
             </button>
             <br></br>
             <button onClick={handleSignInWithGoogle}>Entrar com o Google</button>

            </form>

            <Link to="/register" >Criar uma conta</Link>

            </div>
        </div>
    );
}