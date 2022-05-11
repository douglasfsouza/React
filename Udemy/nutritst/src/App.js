import { useEffect, useState } from "react";
import './style.css'

 

function App() {
  const [nutri,setNutri] = useState([]);

  useEffect(()=>{
    function carregar()
    {
        let url = 'https://sujeitoprogramador.com/rn-api/?api=posts';
        fetch(url)
        .then((r)=> r.json())
        .then((j)=> {
          console.log(j);
          setNutri(j);
        })
    }
    carregar();
  },[])

  

  return (
    <div className="container" >
      <header>Nutri</header>
      
      {nutri.map(x=>{
        return(
          <article key={x.id} className="post">
            <strong className="titulo">{x.titulo}</strong>
            <br/>
            <img src={x.capa} className="capa"></img>
            <p className="subtitulo">SubTitulo: {x.subtitulo}</p>
            <a className="botao">Acessar</a>

          </article>
          
        )        
      })}
       
    </div>
  );
}

export default App;
