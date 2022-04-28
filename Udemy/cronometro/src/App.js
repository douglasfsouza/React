import logo from './logo.svg';
import './App.css';
import './style.css';
import { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      numero:0,     
      startStop: 'Iniciar'
    }
    this.timer = null;
    this.startStop = this.startStop.bind(this);    
    this.reiniciar = this.reiniciar.bind(this);
  }
  startStop(){
    if (this.timer !== null){       
      clearInterval(this.timer);
      this.timer = null;
      let st  = this.state;
      st.startStop = "Iniciar"
      this.setState(st);       
    }
    else{
      this.timer = setInterval(() => {
          let state = this.state;        
          state.numero += 0.1;
          state.startStop = 'Pausar';
          this.setState(state);        
          
      }, 100);
    }
  }   

  reiniciar(){
      clearInterval(this.timer);
      this.timer = null;
      let st  = this.state;
      st.startStop = "Iniciar"
      st.numero = 0
      this.setState(st);    
  }

  render(){
    return (
      <div className='container'>
        <img className='img' src={require('./assets/crono.png')}></img>
        <a className='num'>{this.state.numero.toFixed(1)}</a>
        <div className='areabtn'>
          <a className='botao' onClick={this.startStop}>{this.state.startStop}</a>          
          <a className='botao' onClick={this.reiniciar}>Reiniciar</a>        
        </div>
      </div>     
    );
  }  
}

export default App;
