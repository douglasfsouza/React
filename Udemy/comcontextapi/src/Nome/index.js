import { useContext } from "react";
import { UserContext } from "../contexts/user";

function Nome(){
    const {alunos,setAlunos} = useContext(UserContext);
    return(
        <div>
            <span style={{color:'red'}}>Nome:{alunos}</span>
            <br/>
            <button onClick={()=>setAlunos('Math')}>Mudar</button>
            <br/>             
        </div>
    )
}
export default Nome;