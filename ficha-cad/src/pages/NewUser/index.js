import "./newuser.css"
import React,{ useState} from "react"
import { Link } from 'react-router-dom' // importando o react router dom para acessar o add
import {
    addDoc, // para gerar um ID aleatorio
    collection,
    //getDocs,
    //onSnapshot, // algo realtime
    //query, //busca
    //orderBy, //  a tarefa mais recente para a menos recente
    //where, 
    //doc,
    //deleteDoc, // deletar documento
    //updateDoc, // atualizar o documento
    
} from 'firebase/firestore'
import { db } from "../../firebaseconect";
import { Button } from 'primereact/button';



const NewUser = () =>{
    const [user, setUser] = useState({})
    const [nome, setnome] = useState('');
    const [telefone, settelefone] = useState('');
    const [data, setdata] = useState('');
   // const [cpf, setcpf] = useState('');
    
   // const [sexo, setsexo] = useState('');
    //const [cep, setcep] = useState('');
    //const [uf, setuf] = useState('');
    //const [endereco, setendereco] = useState('');
   // const [bairro, setbairro] = useState('');
   // const [complemento, setcomplemento] = useState('');
    //const [cidade, setcidade] = useState('');

    const submit = async (e) =>{
        e.preventDefault();
        await addDoc(collection(db, "users"), {
                 
                nome: nome,
                telefone: Number (telefone),
                data: data,
            
        });
        console.log(db);
    }
    return(
        <div className="newUser">
            <h1 className="newUserTitle">Novo usuario</h1>

            <form className="newUserForm" >
                <div className="newUserItem">
                    <label>Nome</label>
                    <input type="text" name="nome" value={nome} 
                    onChange={(e) =>{
                        setnome(e.target.value);
                    }}/>
                </div>

                <div className="newUserItem">
                    <label>Telefone</label>
                    <input type="number" name="telefone"  value={telefone} 
                    onChange={(e) =>{
                        settelefone(e.target.value);
                    }}/>
                </div>
                <div className="newUserItem">
                    <label>Data Nascimento</label>
                    <input type="text" name="data"  value={data} 
                    onChange={(e) =>{
                        setdata(e.target.value);
                    }}/>
                </div>

                
                <div>
              
               <button type="submit" className="newUserButton" onClick={()=> {
                submit();
               } }>submit</button>
                
                </div>

                <Link className="button-link" to='/admin'>
                <Button label="Voltar" severity="success"  />
                </Link>

                
               
            </form>
            
        </div>
        

    )
    
    }
    export default NewUser
 