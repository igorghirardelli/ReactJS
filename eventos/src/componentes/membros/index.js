import React, { Component } from 'react';

class Membro extends Component{

    constructor(props){
        super(props);
        this.state = {
            nome:props.nome
        };

        this.entrar = this.entrar.bind(this);
        this.sair = this.sair.bind(this);

    }

    entrar(){
       this.setState({nome:"igor"})
    }

    sair(){
        this.setState({nome:" "})
    }


    render(){
        return(
            <div>
            <h2> Bem vindo {this.state.nome}</h2> 
            <button onClick={this.entrar}>Entrar como igor</button>
            <button onClick={this.sair}>Sair</button>
            </div>
        );
    }
}
export default Membro;