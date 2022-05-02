 import React, {useState} from "react";
 

function App() {
  const[tarefas,setTarefas] = useState([
    'Aprender React',
    'Treinar ingles'
  ]);

  const [nome,setNome] = useState('Douglas');

  const[input, setInput] = useState('');

  function Adicionar(){
    //setTarefas([...tarefas,'Descansar']);
    setTarefas([...tarefas,input]);
    setInput('');
  }
   
  return (
    <div >
        <h1>Tarefas para {nome}</h1>
        <ul>
          {tarefas.map(tarefa =>(
                                   <li key={tarefa}>{tarefa}</li>
                                )          
          )}
        </ul>
        <button type="button" onClick={Adicionar}>Adicionar</button>
        <input type="text" value={input} onChange={e => setInput(e.target.value)} />
        
    </div>
  );
}

export default App;
