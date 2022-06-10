import React, { useEffect, useState } from "react";
import {FaArrowLeft} from 'react-icons/fa';
import { Container } from "./styles";
import { Loading } from "./styles";
import { Owner } from "./styles";
import { BackButton } from "./styles";
import { IssuesList } from "./styles";
import { PageActions } from "./styles";
import { States } from "./styles";
import api from '../../services/api';

export default function Repositorio({match}){
    const [repositorio, setRepositorio] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [filterIndex, setFilterIndex] = useState(0);
    const [filters, setFilters] = useState([
        {state: 'open', label: 'Abertas', active: true},
        {state: 'closed', label: 'Fechadas', active: false},
        {state: 'all', label: 'Todas', active: false}
    ])

    function handleState(index){    
        setFilterIndex(index);         
    }

    function handlePage(action){
        setPage(action === 'back' ? page -1 : page+1);
    }

    useEffect(()=>{
        async function loadIssue(){
            const nomeRepo = decodeURIComponent(match.params.repositorio);
            const response = await api.get(`/repos/${nomeRepo}/issues`,{
                params:{
                    state: filters[filterIndex].state,
                    page,
                    per_page: 5
                }
            });

            setIssues(response.data);
        }
        loadIssue();
    },[page,filterIndex, filters]);
    

    useEffect(()=>{
        async function load(){
            const nomeRepo = decodeURIComponent(match.params.repositorio);

            const [repositorioData, issuesData] = await Promise.all([
                api.get(`/repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`,{
                    params: {
                        state: 'open',                        
                        per_page: 5
                    }
                })
            ]);

            console.log('promise data:');

            console.log(issuesData.data);

            setRepositorio(repositorioData.data);
            setIssues(issuesData.data);
            setLoading(false);
        }

        load();
    },[match.params.repositorio])

    if (loading){
        return(
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        )        
    }
    return(
        <Container>
            <h1 style={{color:'#FFF'}}>Repositorio: {decodeURIComponent(match.params.repositorio)}</h1>
            <BackButton to="/">
                <FaArrowLeft color="#000" size={14}/>
            </BackButton >
            <Owner>
                <img src={repositorio.owner.avatar_url} alt={repositorio.owner.login}></img>
                <h1>{repositorio.name}</h1>
                <p>{repositorio.description}</p>
            </Owner>

            <States active={filterIndex}>
                {
                    filters.map((x, index)=>(
                        <button key={'btn-state-' + x.label} type="button" onClick={()=> handleState(index)} >{x.label}</button>
                    ))
                }                
            </States>

            <IssuesList>
                {issues.map((issue)=>(
                    <li key={String(issue.id)}>
                        <img src={issue.user.avatar_url} alt={issue.user.login} key={'img-' + issue.id}></img>
                        <div key={'div-' + issue.id}>
                            <strong key={'strong-1' + issue.id}>
                                <a href={issue.html_url} key={'a1-' + issue.id}>{issue.title}</a>

                                {issue.labels.map((label)=>(
                                    <span >{label.name}</span>
                                ))}
                            </strong>
                            <p>{issue.user.login}</p>
                        </div>
                    </li>
                ))}
            </IssuesList>

            <PageActions>
                <button type="button" onClick={()=>handlePage('back')} disabled={page < 2}>
                    Voltar
                </button>
                <button type="button" onClick={()=>handlePage('next')}>
                    Proxima
                </button>

            </PageActions>
        </Container>
    )
}