import React, { Component } from 'react';


class App extends Component {


  constructor (props){
    super(props);
    this.state = {
      feed:[
        {id:1, username: "igor", curtidas:10, comentarios:2},
        {id:2, username: "joao", curtidas:15, comentarios:3},
        {id:3, username: "paulo", curtidas: 28, comentarios:13},
        {id:4, username: "eduardo", curtidas: 18, comentarios:0},
      ]
    };


  }

 
  render(){
    return (
      <div >
       
       {this.state.feed.map((item) => {
          return(
            <div key = {item.id}>
              <h3>{item.username}</h3>
              <a > {item.curtidas  } curtidas / comentarios {item.comentarios}</a>
              <hr></hr>
            </div>
          );

       })}

      </div>

    );


  }

}

export default App;