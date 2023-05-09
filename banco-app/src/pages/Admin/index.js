import { useState,useEffect }  from "react" /// importar para armazenar oque o usuario digitar
import './admin.css'
import {auth,db} from '../../firebaseconect' // importar o firebase e o auth para entrar na conta
import {signOut} from 'firebase/auth' // deslogar usuario

import {
    addDoc, // para gerar um ID aleatorio
    collection,
    onSnapshot, // algo realtime
    query, //busca
    orderBy, //  a tarefa mais recente para a menos recente
    where, 
    doc,
    deleteDoc, // deletar documento
    updateDoc // atualizar o documento
} from 'firebase/firestore'

export default function Admin(){
    const [tarefaInput, setTarefaInput] = useState(''); // armazena um valor
    const [user, setUser] = useState({}) // vai começar como objeto vazio
    const [edit, setEdit] = useState({}) // armazenar os itens que voce esta querendo editar    
    
    const [tarefas, setTarefas] = useState([]); // vai ser um array vazio até que busque as tarefas

    useEffect(() => {
        async function loadTarefas(){
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))

            if(userDetail){
                const data = JSON.parse(userDetail);

                const tarefaRef = collection(db, "tarefas")
                const q = query (tarefaRef,orderBy("created","desc"),where("userUid", "==", data?.uid)  ) // passei a referencia pra fazer uma busca 
                const unsub = onSnapshot(q,(snapshot) => { ///  atualizar em realtime 
                    let Lista = [];
                    
                    snapshot.forEach((doc) =>  {
                        Lista.push({
                            id: doc.id,
                            tarefa:doc.data().tarefa,
                            userUid:doc.data().userUid 
                    })   /// percorrer todos os itens que achou
                    
                })

                console.log(Lista);
                setTarefas(Lista);

                })


            }


        }
        loadTarefas();
    },[])

   async function handleRegister(e){  /// usar o async pra demorar um pouco pra usar o await depois
        e.preventDefault(); // não atualizar a pagina 
        
        if(tarefaInput === ''){
            alert("Digite sua tarefa");
            return;
        }

        if(edit?.id){
            handleUpdateTarefa();
            return;
        }



        await addDoc(collection(db,"tarefas"), {
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user?.uid
        })

        .then(() => {
            alert("tarefa registrada")
            console.log("Tarefa registrada")
            setTarefaInput('')/// zerar o input depois de cadrastrar
        })
        .catch((error) => {
            console.log("erro ao registrar" +error)
        })
    }
async  function handleLogout(e){
        await signOut(auth);
    }

    async function deleteTarefa(id){  // quando voce clicar em concluir ela vai apagar a tarefa
        const docRef  = doc(db,"tarefas", id)
        await deleteDoc(docRef);
    }

    function editarTarefa(item){
        setTarefaInput(item.tarefa); // quando clicar ja vai preencher a tela para poder editar
        setEdit(item);

    }

    async function handleUpdateTarefa() {
        const docRef = doc(db, "tarefas",edit?.id)
        await updateDoc(docRef, {
            tarefa: tarefaInput   /// atualizar o tarefa dentro do que esta o tarefa
        })
        .then(() => {
            console.log("TAREFA ATUALIZADA")
            setTarefaInput('') // quando atualizar o tarefaInput vai voltar a ser vazio
            setEdit({})  // o setEdit vai voltar a ser vazio pq vc não esta editando 
          })
          .catch(() => {
            console.log("ERRO AO ATUALIZAR")
            setTarefaInput('')
            setEdit({})
          })

    }
   


    return(
        <div className='admin-container'>
           <h1> Lista de tarefas pessoais </h1>


           <form className="form" onSubmit={handleRegister}>
            <textarea
            placeholder='Digite sua tarefa'
            value={tarefaInput}
            onChange={(e) => setTarefaInput(e.target.value)}
            /// toda vez que voce digitar agente recebe a nossa função anonima com um evento
                    /// set TarefaInput para passar o valor para a useState do tarefa oque vc digitar

            />

            
            {Object.keys(edit).length > 0 ? ( /// se ta maior que 0 quer dizer que voce clicou em editar
                /// então o botao vai valer atualizar tarefa
                 <button className="btn-register" type="submit">Atualizar Tarefa </button>
            ) : (
                /// se não for maior que 0, quer dizer que vc não clicou e não tem nada la 
                <button className="btn-register" type="submit">Registrar tarefa </button>
            )}
           

                
           
     
           </form>
           {tarefas.map((item) => (
                
                <article key={item.id} className="list">
                <p>{item.tarefa}</p>
     
                <div>
                    <button onClick={()=> editarTarefa(item) } className="btn-editar" >Editar</button>
                    <button onClick={()=> deleteTarefa(item.id) } className="btn-delete">Concluir</button>
                </div>
               </article>
                 ))}

           <button className="btn-logout" onClick={handleLogout}>Sair da conta</button>
        </div>
    )
}