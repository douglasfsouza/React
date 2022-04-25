import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import { render } from '@testing-library/react';

class App extends Component {
  constructor(props){
    super(props);
    this.state= {hora:"00:00:00"};    
  }

  componentDidMount(){   

    setInterval(() => {
      let st = this.state;
      st.hora = new Date().toLocaleTimeString();
      this.setState(st);
      
    }, 1000);
  }

  componentDidUpdate(){
    console.log("Atualizou");
  }
  
  render(){
     return (
    <div>
       <h1>Horario</h1>
       <h1>{this.state.hora}</h1>
    </div>
  );
  }
 
}

export default App;
