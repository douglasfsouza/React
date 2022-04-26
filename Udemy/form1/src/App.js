import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
                  email: '',
                  senha:'',
                  sexo:''
                };
    this.changeEmail = this.changeEmail.bind(this);
    this.changeSenha = this.changeSenha.bind(this);
    this.changeSexo = this.changeSexo.bind(this);
  }

  changeEmail(e){
    this.setState({email:e.target.value});
  }

  changeSenha(e){
    this.setState({senha:e.target.value});
  }

  changeSexo(e){
    this.setState({sexo:e.target.value});
  }

  render(){
    return (
      <div >
        Email:
        <input name="txtEmail" value={this.state.email} onChange={this.changeEmail}/><br/> 
        Senha:
        <input type="password" name="txtSenha" value={this.state.senha} onChange={this.changeSenha}/><br/> 
        Sexo:
        <select name="selSexo" value={this.state.sexo} onChange={this.changeSexo}>
            <option name="optMasculino">Masculino</option>
            <option name="optFeminino">Feminino</option>
        </select>

        <div>
            <h3>Resultado armazenado:</h3>
            <a>Email: {this.state.email}</a> <br/>
            <a>Senha: {this.state.senha}</a><br/>
            <a>Sexo: {this.state.sexo}</a>
        
        </div>
      </div>
      
    );
  }
  
}

export default App;
