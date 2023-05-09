import { useState, useEffect } from 'react'
import { db,auth } from './Firebaseconect';
import {Doc,setDoc,collection,addDoc,getDoc, doc, getDocs,updateDoc,deleteDoc,onSnapshot} from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,onAuthStateChanged } from 'firebase/auth'
import './App.css';



function App() {
  const[titulo, setTitulo] = useState('');
  const[autor, setAutor ] = useState('');
  const[idPost, setIdPost] = useState('');

  const[email, setEmail] = useState('');
  const[senha, setSenha] = useState('');


  const[user, setUser] = useState(false);
  const[userDetail, setUserDetail] = useState({})

  const [post,setPosts] = useState([]);


  useEffect(()=> {
    async function loadPosts(){
      const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
        let listaPost = [];
        
        snapshot.forEach((doc) => {
          listaPost.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,


          })
        })

        setPosts(listaPost)

      })


      
    }
    loadPosts();



  }, [])

  useEffect(() => {
    async function checklogin(){
      onAuthStateChanged(auth, (user) => {
        if(user){
          // se tem usuario logado ele entra aqui ...
          console.log(user);
          setUser(true);
          setUserDetail({
            uid: user.uid,
            email: user.email
          })

        }else {
          // não possui nenhum user logado
          setUser(false);
          setUserDetail({})
        }
      })
    




    }
    checklogin();
  }, [])





  async function handleAdd(){
    //await setDoc(doc(db,"posts","12345"), {
     // titulo: titulo,
     // autor: autor,


   // })
   // .then(()=> {
     // console.log("Dados registrados no banco!")
   //} )
   // .catch((error) => {
     // console.log("Gerou erro" +error)
   // })



   await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor,
   })

    .then(() => {
      console.log("Cadrastado com sucesso")
      setAutor("");
      setTitulo("");
    })
    .catch((error) => {
      console.log("Erro" +error)
      
    });

  }
    async function buscarPost(){
      //const postRef = doc(db,"posts","TvI22tFowpOAB0FrfX0R");

      //await getDoc(postRef)
      //.then((snapshot)=> {
       // setAutor(snapshot.data().autor);
       // setTitulo(snapshot.data().titulo);
      //})
      //.catch(()=> {
       // console.log("erro ao buscar")
     // })

     const postRef = collection(db, "posts",idPost)
     await getDocs(postRef) 
     .then((snapshot) => {
        let lista = [];
        
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,


          })
        })

        setPosts(lista)

     }) 
     .catch((error) => {
      console.log("DEU ERRO AO BUSCAR");
     })
    
    }
    
   async function editarPost(){
      const docRef = doc(db, "posts",idPost)
      await  updateDoc(docRef,{
        titulo:titulo,
        autor:autor
      })
      
      .then(() => {
        console.log("Atualizado");
        setIdPost("");
        setTitulo("");
        setAutor("");
      })
      .catch(() => {
        console.log("erro");
      }) 

    }

   async function excluirpost(id){
      const docRef = doc(db, "posts", id)
      await deleteDoc(docRef)


      .then(() => {
        console.log("Post deletado com sucesso");
        
      })
    
    
    }

/// AQUI COMEÇA O SISTEMA PARA CADRASTAR O USUARIO --------------------------------------------------
    async function novoUsuario(){
      await createUserWithEmailAndPassword(auth, email, senha)

      .then(()=> {
        console.log("Cadastrado com sucesso")
        setEmail("");
        setSenha("");
      } )

      .catch((error) =>{
          console.log("erro ao cadrastar")
        if(error.code === 'auth/weak-password'){
          alert("Senha muito fraca")
        } else if(error.code === 'auth/email-already-in-use'){
          alert("email ja existe!")
        }




      })
      
    }

    async function logarUsuario(){
        await signInWithEmailAndPassword(auth, email, senha)
        .then((value) => {
          console.log("User logado com sucecsso")
          console.log(value.user)

          setUserDetail({
            uid: value.user.uid,
            email: value.user.email,

          })
          setUser(true);
          

          setEmail("");
          setSenha("");
          

        })
        .catch(() => {
          console.log("erro ao fazer o login")
        })



    }

     async function fazerLogout(){
        await signOut(auth)
        setUser(false);
        setUserDetail({})



    }

  return (
    <div>

      <h1>OLA GENTE :D</h1>

        {user && (
          <div>
            <strong>
              Seja bem vindo (Voce esta logado!) <br/>
            </strong>
            <span>ID: {userDetail.uid} - Email: {userDetail.email} </span> <br/>
            <button onClick={fazerLogout}>Sair da conta</button>
            <br/> <br/>
          </div>
        )}





      <div className='container'>
        <h2>Usuarios:</h2>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Digite um email'></input>
        <br/>

        <label>Senha</label>
        <input value={senha} onChange={(e) => setSenha(e.target.value)} placeholder='Digite sua senha'></input>
        <br/>

        <button onClick={novoUsuario}>Cadrastar</button>
        <button onClick={logarUsuario}>Login</button>
      </div>

      <br></br>
      <hr/>
      

      <div className='container'>


        <h2>POST</h2>

        <label>ID do Post:</label>
        <input placeholder='Digite o ID post' value={idPost} onChange={(e) => setIdPost(e.target.value) }></input> <br/>



        <label>Titulo:</label>
        <textarea 
          type='text'
          placeholder='Digite o titulo'
          value={titulo}
          onChange={(e) => setTitulo(e.target.value) }
          />

        <label>Autor:</label>
        <input type='text' placeholder='Autor do post' value={autor} onChange={(e)=> setAutor(e.target.value) } />
        
        <button onClick={handleAdd}>Cadrastar</button>

        <button onClick={buscarPost} >Buscar post</button> <br/>

        <button onClick={editarPost}>Atualizar post</button>


        <ul>
          {post.map((post) =>  {
            return(
              <li key={post.id}>
                <strong>ID: {post.id}</strong> <br></br> 
                <span>Titulo: {post.titulo} </span> <br></br>
                <span>Autor: {post.autor}</span> <br></br> 
                <button onClick={ ()=> excluirpost(post.id) }>Excluir</button> <br></br> <br></br>
              </li>
            )
          })}
        </ul>

      </div>
      
    </div>
  );
}

export default App;
