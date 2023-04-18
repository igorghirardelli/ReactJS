import React, { Component } from "react";
import './estilo.css'

class App extends Component {

    constructor(props){
      super(props);
      this.state = {
        textoFrase: ''
      };

      this.quebraBiscoito = this.quebraBiscoito.bind(this);

      this.frases = ['Sigam-me os bons ','A pressa é inimiga da perfeição','O mundo todo em uma flecha','estude enquanto eles dormem', 'Isso vai ser um estouro']
    }


    quebraBiscoito(){
      let state = this.state;
      let numeroAleatorio = Math.floor(Math.random() * this.frases.length);
      state.textoFrase = ' " ' + this.frases[numeroAleatorio] + ' " '
      this.setState(state);
    }


      render(){

        return(
          <div className="container">
            <img src={require('./assents/biscoito.png')} className="img" />

            <Botao nome="abrir biscoito" acaoBtn = {this.quebraBiscoito} />

            <h3 className="textoFrase">{this.state.textoFrase}</h3>
          </div>


        );



      }




}

class Botao extends Component{
  render(){
    return(
        <div>
          <button onClick={this.props.acaoBtn} >{this.props.nome}</button>
        </div>
        
      );
  }
}



export default App;
