import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class Equipe extends Component{
  render(){
    return(
      <div>
        
        <Sobre nome={this.props.nome} idade={this.props.idade} cargo={this.props.cargo}/>
        
        <hr/>
      </div>
    )
  }  
}

class Sobre extends Component{
  render(){
    return(
      <div>
        <h2>Eu sou {this.props.nome}</h2>
        <h3>Tenho {this.props.idade} anos</h3>
        <h4>Meu cargo é {this.props.cargo}</h4>

      </div>
    )
  }
}

function App() {
  return (
    <div>
      <h1>Conheça nossa equipe:</h1>
      <Equipe nome="Douglas" idade="45" cargo="Engenheiro de Sistemas"/>
      <Equipe nome="Nicolas" idade="16" cargo="Programador Mobile"/>
    </div>
  );
}

export default App;
