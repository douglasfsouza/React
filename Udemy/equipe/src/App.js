import logo from './logo.svg';
import './App.css';

const Equipe = (props) => {
  return(
    <div>
       <Sobre nome={props.nome} cargo={props.cargo} idade={props.idade}/>
       <Social fb={props.fb} yt={props.yt}/>
    </div>
  )
}

const Sobre = (props) => {
  return(
    <div>
      <h2>Sou o {props.nome}</h2>
      <h2>Sou {props.cargo}</h2>
      <h2>Tenho {props.idade} anos</h2>
      <hr/>
    </div>   
  )
}

const Social = (props) => {
  return(
    <div>
       <a href={props.fb}>facebook </a>
       <a href={props.yt}>youtube </a>
       <h3>{props.fb}</h3>
       <hr/>
    </div>
   
  )
}



function App() {
  return (   
    <div>
      <Equipe nome="Doug" cargo="Analista" idade="45"
              fb="https://www.facebook.com" yt="https://www.youtube.com" />      

      <Equipe nome="Matheus" cargo="Programador" idade="17"
              fb="https://www.facebook.com" yt="https://www.google.com" />      
    </div>         
          
        
  );
}

export default App;
