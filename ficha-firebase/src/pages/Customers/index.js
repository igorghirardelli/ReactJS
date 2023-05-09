import {useState} from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'

import {db} from '../../services/firebaseConnection'
import {addDoc,collection} from 'firebase/firestore'

import {toast} from 'react-toastify'

import {FiUser} from 'react-icons/fi'

export default function Customers(){

    const [nome,setNome] = useState();
    const [data,setData] = useState();
    const [telefone,setTelefone] = useState();

  async  function handleRegister(e){
        e.preventDefault();
        
        if(nome !== '' && data !== '' && telefone !== ''){
            await  addDoc(collection(db, "customers"),{
                nome:nome,
                data:data,
                telefone:telefone
            } )
            .then(()=>{
                setNome('');
                setData('');
                setTelefone('');
                toast.success("Usuario registrado")
            })
            .catch((error)=>{
                console.log(error)
                toast.error("Erro ao fazer o cadastro")
            })
        }else{
            toast.error("Preencha todos os campos!")
        }
    }


    return(
        <div>
            <Header/>
            <div className='content'>
            <Title name="Clientes"> 
                <FiUser size={25}/>
            </Title>

            <div className='container'>
                <form className='form-profile' onSubmit={handleRegister}>
                    <label>Nome</label>
                    <input type="text" placeholder='Nome' value={nome} onChange={(e)=> setNome(e.target.value)}></input>

                    <label>Data de Nascimento</label>
                    <input type="date" placeholder='' value={data} onChange={(e)=> setData(e.target.value)}></input>

                    <label>Telefone</label>
                    <input type="text" placeholder='seu numero' value={telefone} onChange={(e)=> setTelefone(e.target.value)}></input>

                    <button type='submit' >
                        Cadrastrar 
                    </button>
                </form>


            </div>


            </div>

        </div>
    )
}