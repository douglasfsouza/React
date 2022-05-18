import Nome from "../Nome";
 
 
function Alunos({nome,sobre,setNome}){
    return(
        <div>
            <span style={{color:'blue'}}>Alunos</span>     
            <Nome nome={nome} sobre={sobre}  setNome={setNome}/>  
           
        </div>
    )
}

export default Alunos;