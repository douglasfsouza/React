import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Title} from './styles';
import {Container} from './styles';
import {SubmitButton} from './styles';
import {Form} from './styles';
import { List } from "./styles";
import { DeleteButton } from "./styles";
import {FaBars, FaGithub, FaPlus, FaSpinner, FaTrash} from 'react-icons/fa';
import api from '../../services/api';
import { toast } from "react-toastify";
export default function Main(){

    const [newRepo, setNewRepo] = useState('');
    const [repositorios, setRepositorios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alerta, setAlerta] = useState(null);
    const [empty, setEmpty] = useState(false);

    useEffect(()=>{
        debugger;
        const repoStorage = localStorage.getItem('repos');
        if (repoStorage){
            setRepositorios(JSON.parse(repoStorage));
        }
    },[]);

    useEffect(()=>{
        debugger;
        if (repositorios.length !== 0 || empty){
            localStorage.setItem('repos',JSON.stringify(repositorios));
        }
        
    },[repositorios]);

    function handleInputChange(e){
        setNewRepo(e.target.value);
        setAlerta(null);
    }
     

    const handleDelete = useCallback((repo) =>{
        const find = repositorios.filter(r => r.name !== repo);
        setRepositorios(find);
        debugger;
        setEmpty(repositorios.length === 1);

    },[repositorios]);

    const handleSubmit = useCallback((e)=> {
       e.preventDefault();
       async function submit(){
           try{
               if (newRepo === ''){
                   setAlerta(true);
                   toast.error('Repositorio não informado');
                   
                   throw new Error('Repositorio não informado');
               }
              
               const hasRepo = repositorios.find(r => r.full_name === newRepo);
               if (hasRepo){
                   setAlerta(true);
                   toast.error('Repositório já informado');

                   throw new Error('Repositorio ja informado');
               }
                
                setLoading(true);
                const response = await api.get(`repos/${newRepo}`);
                const data = response.data;
                setRepositorios([...repositorios,data]);
                setNewRepo('');   
                toast.success('Repositorio incluido');
                
                console.log(response.data);
           }
           catch(error){
               console.log("Erro ao fazer submit: Erro: " + error);
           }
           finally{
               setLoading(false);
               console.log("Finaly");
           }
           
       }

       submit();
       
    },[newRepo,repositorios]);
    return(
        <Container>
            <h1 key={'h1-repo-01'}> 
                <FaBars size={14} color='#FFF' key={'fabars-repo-01'}/>
                <FaGithub size={14} key={'faGitHub-repo-01'}/>
                Meus Repositorios 
            </h1>
            <Form onSubmit={handleSubmit} key="form-repo" alerta={alerta}>
                <input type="text" placeholder = "Adicionar Repositorios" value={newRepo} onChange={(e)=>handleInputChange(e)} key="input-repo-01"/> 
                <SubmitButton loading={loading ? 1 : 0} key="submit-repo-01">
                    {loading ? (
                        <FaSpinner color="#FFF" size={14} key="faSpinner-repo-01"/>
                    ):(
                        <FaPlus color="#FFF" size={14} key="faPlus-repo-01"/>
                    )}
                </SubmitButton>
            </Form>
            <List>
                {repositorios.map((repo)=>(
                    <li key={'li' + repo.name + repo.id}>
                         
                        <span key={'span-' + repo.name}>
                            <DeleteButton onClick={()=>handleDelete(repo.name)}>
                                <FaTrash size={14}/>
                            </DeleteButton>
                            {repo.full_name}
                        </span>
                        <Link to={'/repositorio/' + encodeURIComponent(repo.full_name)} key={'link-repo-' + repo.name}>
                            <FaBars size={20} key={'fabars' + repo.name}/>
                        </Link>
                    </li>

                ))}
            </List>
        </Container>
    )
}