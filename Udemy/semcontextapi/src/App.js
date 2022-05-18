import { useState } from "react";
import Alunos from "./Alunos";

function App() {
  const [nome,setNome]  = useState('');
  return (
    <div >
      <div>
        <h1>ESCOLA</h1>
        <hr/>
      </div>
       <Alunos nome={nome} sobre='Ferreira' setNome={setNome}/>     
       
     
    </div>
  );
}

export default App;
