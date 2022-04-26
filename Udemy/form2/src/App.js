import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      nome:'',
      email:'',
      senha:'',
      error:''
    }
    this.cadastrar = this.cadastrar.bind(this);
  }

  cadastrar(event){
    let nome =  this.state.nome;
    let email = this.state.email;
    let senha = this.state.senha;
    let msg = `Nome: ${nome}\nEmail: ${email}\nSenha: ${senha}`;
    this.setState({error:''});
    if (nome && email && senha){
      alert(msg);
    }
    else{
      this.setState({error:'Faltou algo!!'});
    }
    
    event.preventDefault();
  }
  render(){
    return (
      <div >
          <form onSubmit={this.cadastrar}>
            <h1>Segundo formulario</h1>
            <h1>{this.state.error && this.state.error}</h1>
            <label>Nome:</label>
            <input type="text" value={this.state.nome} onChange={(e)=>this.setState({nome:e.target.value})}/> <br/>
            <label>Email:</label>
            <input type="email" value={this.state.email} onChange={(e)=> this.setState({email:e.target.value})}/><br/>
            <label>Senha:</label>
            <input type="password" value={this.state.senha} onChange={(e)=> this.setState({senha:e.target.value})}/><br/>
            <button type='submit' > Cadastrar</button>

          </form>
      </div>
    );
  }
  
}

export default App;
