
export default function App(){
    const Equipe = (props) => {
      return(
        <div>
          <Sobre nome={props.nome} cargo = {props.cargo} idade = {props.idade} />
          <Social fb = {props.facebook}  lk = {props.likedlin} />
          <hr/>

        </div>

      ); 
      
      
    }

    const Sobre = (props) => {
      return(
        <div>
          <h2>Ola sou o (a) {props.nome} </h2>
          <h3>Cargo: {props.cargo} </h3>
          <h3>Idade: {props.idade} </h3>
        </div>
      );
    }

    const Social = (props) => {
      return(
        <div>
          <a href="props.fb">Facebok</a>
          <a href="props.lk">Linkedlin</a>
        </div>
      );
    }
    
    
  

  return (
    
      <div>
       <h1>Conheça a nossa equipe:</h1>
       <hr/>
        <Equipe nome = "igor"cargo = "Programador" idade = "25" facebook = "https://facebok.com"  likedlin = "https://www.facebook.com"/>
        <Equipe nome = "Joao"cargo = "Design" idade = "20" facebook = "https://www.facebook.com"  likedlin = "https://www.facebook.com"/>
      </div> 
  )

}
