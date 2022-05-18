import { useContext } from "react";
import { UserContext } from "../contexts/user";
import Nome from "../Nome";

function Alunos(){
    const {alunos,setAlunos,qtdAlunos} = useContext(UserContext);
    return(
        
        <div>
            <h1>Alunos. nome: {alunos}</h1>
            <h1>Quantidade total de alunos: {qtdAlunos} </h1>
            <Nome/>
        </div>
    )
}

export default Alunos;