import React from 'react';
import logo from './logo.svg';
import './App.css';

const BemVindo = (props) => <h2>Bem vindo {props.nome}</h2>
const Welcome = (props) => {
  return(
    <div>
    <h2>Welcome sir {props.name}</h2>
  </div>
  )  
}

const BienVenido = (props) =>{
  return(
    <div>
    <h2>Bien Venido {props.nome}</h2>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <BemVindo nome="Doug"/>
      <Welcome name="Doug"/>
      <BienVenido nome="Doug"/>
      <h1>Curso de React</h1>
    </div>
  );
}

export default App;
