import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      nome: "Contador",
      cont: 0
    }
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }
  increase(){
    let st = this.state;
    st.cont++;
    this.setState(st);
  }

  decrease(){
    let st = this.state;
    if (st.cont === 0){
      st.nome = "Contador - Zero"
    }
    else{
      st.cont--;
      st.nome = "Contador"
    }
    
    this.setState(st);
  }

  render(){
    return (
      <div>
        <h1>{this.state.nome}</h1>
        <button onClick={this.decrease}>-</button>
        {this.state.cont}  
        <button onClick={this.increase}>+</button>
      </div>
    );

  }
  
}

export default App;
