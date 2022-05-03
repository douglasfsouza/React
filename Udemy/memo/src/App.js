
import { useEffect, useMemo, useState } from 'react';

function App() {
  const[tarefa, setTarefa] = useState([
    
  ]);
  const[input,setInput] = useState('');

  const totalTarefas = useMemo(()=>tarefa.length,[tarefa]);
  
  function Add(){
    if (input){
      setTarefa([...tarefa,input]);
      setInput('');
    }
    
  }

  useEffect(()=>{
    const taskStorage = localStorage.getItem('task');
    if (taskStorage){
      setTarefa(JSON.parse(taskStorage));
    }  

    return () => {};    
  },[]);

  useEffect(()=>{
    if (tarefa){
      localStorage.setItem('task',JSON.stringify(tarefa));
    }    
  }
  ,[tarefa]);
  return (
    <div >
      <ul>
        {tarefa.map(tar =>(
          <li key={tar}>{tar}</li>
        ))}

      </ul>
      <input value={input} onChange={(e)=>setInput(e.target.value)}></input>
      <button onClick={Add}>+</button>
      <strong><br/>Voce tem {totalTarefas} tarefas</strong>
    </div>
  );
}

export default App;
