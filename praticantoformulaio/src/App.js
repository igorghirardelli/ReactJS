import React, {Component} from 'react'

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        nome: "",
        email: "",
        senha: "",
        error: ""



    };

    this.enviar = this.enviar.bind(this);


  }

  enviar(event){
   const{nome,email,senha} = this.state;

   if(nome !== "" && email !== "" && senha !== ""){
    alert(`Nome: ${nome} \n Email: ${email} \n Senha: ${senha}     `)
   }
   else {
      this.setState({error: "preencha os campos corretamente"})
   }
   

    event.preventDefault();
  }

  render(){
    return(
    

      <div>
        <h1>Novo usuario</h1>

        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.enviar} >

          <label>Nome:</label>
          <input type="text" value={this.state.nome}   onChange={ (e) => this.setState({nome: e.target.value  }) }    /> <br></br>
          <label>Email:</label>
          <input type = "email" value={this.state.email} onChange={ (e) => this.setState({email: e.target.value})  }        /> <br></br>
          <label>Senha:</label>
          <input type = "password" value={this.state.senha} onChange={ (e) => this.setState({senha: e.target.value})  }        /> <br></br>

          <button type = "submit" >Enviar</button>
        </form>

      </div>





    );

  }

}


export default App;
