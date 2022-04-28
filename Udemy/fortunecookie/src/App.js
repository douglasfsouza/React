import logo from './logo.svg';
import './App.css';
import './estilo.css';
import { Component } from 'react';
import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      frase: ''
    }
    this.quebrar = this.quebrar.bind(this);
    this.frases = [
      'Siga os bons e aprenda com eles', 'O bom senso vale mais do que o conselho',
      'O riso é a menor distancia entre duas pessoas', 'Deixe de lado as preocupacoes e seja feliz!',
      'Realize o obvio, pense no improvavel e conquiste o impossivel',
      'Acredite em milagres, mas nao dependa deles',
      'A maior barreira para o sucesso é o medo do fracasso'
    ]
  }
  render(){
    return (
      <div >
        <Cookie frase={this.state.frase} quebrar={this.quebrar}/>
      </div>
    );
  }

  quebrar(){
     let state = this.state;
     let num = Math.floor(Math.random() * this.frases.length);
     let frase = this.frases[num];
     state.frase = frase;
     
     this.setState(state);
  }
  
}

class Cookie extends Component{
  render(){
    return(
      <div className='container'>
        <img className='img' src={require('./assets/fortune.jpg')}></img>
        <button onClick={this.props.quebrar}>Quebrar</button>
        <h1 className='frases'>{this.props.frase}</h1>
      </div>
    )
  }
}

export default App;
