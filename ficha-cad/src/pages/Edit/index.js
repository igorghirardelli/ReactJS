import React,{ useState} from "react"
import { Link, useParams } from 'react-router-dom' // importando o react router dom para acessar o add
import { db } from "../../firebaseconect";
import { Button } from 'primereact/button';
import {
    doc,
    getDoc,
    setdoc,
    updateDoc

}
from "firebase/firestore"

const Edit = () => {
    const {id} = useParams
    const [nome, setnome] = useState('');
    const [telefone, settelefone] = useState('');
    const [data, setdata] = useState('');
    const decRef = doc(db, 'users', id);
    
    const [enome, setenome] = useState('');
    const [etelefone, setelefone] = useState('');
    const [etedata, setedata] = useState('');
    
    const getd  = async() => {
        const userSnapshot = await getDoc(decRef);
        setenome(userSnapshot.data().nome);
        setenome(userSnapshot.data().setelefone);
        setenome(userSnapshot.data().setedata);

    }
    getd();

    const update = async() => {
        await updateDoc(decRef, {
            nome: nome,
            telefone: Number(telefone),
            data: data

        });

    }

    return(
        <div>

<div className="newUserItem">
                    <label>Nome</label>
                    <input type="text" name="nome" value={nome} 
                    onChange={(e) =>{
                        setnome(e.target.value);
                    }} placeholder={enome} />
                    
                </div>

                <div className="newUserItem">
                    <label>Telefone</label>
                    <input type="number" name="telefone"  value={telefone} 
                    onChange={(e) =>{
                        settelefone(e.target.value);
                    }} placeholder={etelefone}/>
                </div>
                <div className="newUserItem">
                    <label>Data Nascimento</label>
                    <input type="text" name="data"  value={data} 
                    onChange={(e) =>{
                        setdata(e.target.value);
                    }} placeholder={etedata}/>
                </div>

                
                <div>
              
               <button type="submit" className="newUserButton" onClick={()=> {
                update();
               } }>Update</button>
                
                </div>
          



        </div>


    )



}
export default Edit