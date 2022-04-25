import React, {Component} from 'react'
class Membro extends Component{
    constructor(props){
        super(props);
        this.state={
            nome: props.nome
        }
        this.entrar = this.entrar.bind(this);
    }
    entrar(nome){
        this.setState({nome:nome});
    }
     
    render(){
        return(
            <div>
                <h1>Ola {this.state.nome}</h1>
                <button onClick={()=> this.entrar("Doug")}>Entrar como Doug</button>
                <button onClick={()=> this.setState({nome:"Visitante"})}>Sair</button>
            </div>
        )        
    }
}

export default Membro;