
import React, { useState, useEffect } from 'react'; /// importar para armazenar oque o usuario digitar
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
//import { Dialog } from 'primereact/dialog';
import {auth,db} from '../../firebaseconect' // importar o firebase e o auth para entrar na conta
import {signOut} from 'firebase/auth' // deslogar usuario
import {
    //addDoc, // para gerar um ID aleatorio
    collection,
    getDocs,
    //onSnapshot, // algo realtime
    //query, //busca
    //orderBy, //  a tarefa mais recente para a menos recente
    //where, 
    doc,
    deleteDoc // deletar documento
    //updateDoc, // atualizar o documento
    
} from 'firebase/firestore'



//import { ProductService } from './service/ProductService';
import './admin.css';  





const Admin = () => {
    const [users, setUsers] = useState([]);
    //const [visible, setVisible] = useState(false);

    async function getusuarios(db){ //esse codigo vai acessar o banco de dados e pegar oq tem no " users " e imprimir na tabela
        const usuario = collection(db,"users");   
        const userSnapshot = await getDocs(usuario);
        const userlist = userSnapshot.docs.map(doc => doc.data());
        
        setUsers(userlist);
    } 

    useEffect(() =>{
        getusuarios(db);
    })

   function buttons() {
        return (

           <div>


            <Button onClick={()=> del()}>apagar</Button>
           

            
            <Button>editar</Button>
           
           
           </div>
           
        ) 

        }       

    async  function handleLogout(e){
        await signOut(auth);// deslogar  usuario
    }
    
    const del = async() =>{
        await deleteDoc(doc(db,"users",id));
        
    }

    return (
        <div>
             
            <Button label="Logout" severity="danger" onClick={handleLogout} />

            <Link className="button-link" to='/newuser' >
            <Button label="Add user" severity="success" />
            </Link>
            
  
           


           
            
            <div className="card flex justify-content-center">
            <DataTable className='card' value={users} showGridlines tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="id"></Column>
                <Column field="nome" header="Nome"></Column>
                <Column field="data" header="data"></Column>
                <Column field="telefone" header="telefone"></Column>
                <Column body={buttons} ></Column>  
                
            </DataTable>
        </div>
            
           
        </div>
        
    );
        
    
}
export default Admin