import logo from './logo.svg';
import './App.css';
import Membro from  './component/Membro'
import { Component } from 'react';

class App extends Component {
  render(){
     return (
    <div>
      <h1><Membro nome="Visitante"/></h1>
    </div>
  );
  }
 
}

export default App;
