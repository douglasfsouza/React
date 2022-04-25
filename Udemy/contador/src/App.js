import logo from './logo.svg';
import './App.css';
import {Component} from 'react';



 
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      nome: "Douglas",
      cont: 0
    }
    this.aumentar = this.aumentar.bind(this);
    this.diminuir = this.diminuir.bind(this);
  
  }

  aumentar(){
     let st = this.state;
     st.cont++;
     this.setState(st);

     if (st.cont === 0){
       this.setState({nome: "Zero"});
     }
     else{
       this.setState({nome:"Douglas"});
     }
  }

  diminuir(){
    let st = this.state;
    st.cont--;
    this.setState(st);

    if (st.cont === 0){
      this.setState({nome: "Zero"});
    }
    else{
      this.setState({nome:"Douglas"});
    }
 }
  render(){
    return (
    <div>
      <h1>{this.state.nome}</h1>
      <h1><button onClick={this.diminuir}>{"\<"}</button> {this.state.cont} <button onClick={this.aumentar}>{"\>"}</button> </h1>
    </div>
  );
  }
  
}

export default App;
