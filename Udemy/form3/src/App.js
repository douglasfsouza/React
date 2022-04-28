import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      form:{
        nome:'Douglas',
        email:'douglas.fsouza2014@gmail.com',
        senha:'123',
        sexo:'Masculino',
        error:''
      }
    }
    this.dadosForm = this.dadosForm.bind(this);
    this.cadastrar = this.cadastrar.bind(this);
  }

  dadosForm(e){
    let form = this.state.form;
    form[e.target.name] = e.target.value;
    this.setState({form: form});
  }

  cadastrar(event){
    let form = this.state.form;
    if (form.nome && form.email && form.senha && form.sexo){
      let msg = `Nome: ${form.nome}\nEmail: ${form.email}\nSexo: ${form.sexo}`
      alert(msg);
      form.error = '';
    }
    else{
      form.error = "Ops, faltou algo!!! " + form.sexo;      
    }
    this.setState({form: form});

    event.preventDefault();
    
  }
  render(){
    return (
      <div >
          <h1>Terceiro formulario</h1>
          <h1>{this.state.form.error ?? this.state.form.error}</h1>
          <form onSubmit={this.cadastrar}> 
            <label>Nome:</label>
            <input name="nome" type="text" value={this.state.form.nome} onChange={this.dadosForm}/> <br/>
            <label>Email:</label>
            <input name="email" type="email" value={this.state.form.email} onChange={this.dadosForm}/> <br/>
            <label>Sexo:</label> 
            <select name="sexo" value={this.state.form.sexo} onChange={this.dadosForm}>
                <option>Masculino</option>
                <option>Feminino</option>
            </select>
            <br/>
            <label>Senha:</label>
            <input name="senha" type="password" value={this.state.form.senha} onChange={this.dadosForm}/> <br/>
            <button type="submit">Cadastrar</button>
          </form>
          
      </div>
    );
  }
  
}

export default App;
