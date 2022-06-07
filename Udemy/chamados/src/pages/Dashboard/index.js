import { useContext, useEffect, useState, React } from "react";
import {Link} from 'react-router-dom';
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import Title from '../../components/Title';
import './dashboard.css';
import {FiMessageSquare, FiPlus, FiSearch, FiEdit2} from 'react-icons/fi';
import {toast} from 'react-toastify';
import {format} from 'date-fns';
import Modal from "../../components/Modal";


export default function Dashboard(){
    const {user, signOut} = useContext(AuthContext);
    const [chamados,setChamados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();
    const [pagina, setPagina] = useState(1);
    const [loadPage, setLoadPage] = useState(false);

    useEffect(()=>{ 
        loadChamados();       
    },[])

    async function loadChamados(){
        
        
        //alert('load');
        let url = "http://localhost:61749/Issue/getIssues?Pagina=" + pagina;
        await fetch(url,{method: 'GET', headers: new Headers({
            'Content-Type' : 'application/json;charset=UTF-8'
        })})
        .then((r)=> {                 
            return r.json();
        })
        .then((x)=> {
            if (x.length != 0 ){
                //console.log(format(new Date(),'eeee'));
                
                //setChamados(chamados => [...chamados, ...x]);                       
                
                
                debugger;
                let exist = chamados.find(a => a.id == x[0].id);
                if (exist == null){
                   // setChamados(...chamados, x);  
                   if (pagina == 1){
                       setChamados(x);
                   }
                   else{
                       setChamados(chamados => [...chamados, ...x]);
                   }
                   setPagina(pagina+1);
                    
                }
                                              
            }
            else{                 
                toast.error(x);
            } 
            setLoading(false);  
            setLoadPage(true);         
            
        })
        .catch((ex)=>{
            console.log(ex);
            setLoading(false);
            toast.error("Erro ao carregar os chamados: " + ex);
        }) 
                

    }

    function toglePostModal(d){
        setShowPostModal(!showPostModal);
        setDetail(d);
    }

    function handleMais(){          
        setPagina(pagina+1);
        setLoadPage(false);
        setLoading(true);
        loadChamados();
    }
    return(
        <div>
            <Header/>
            <div className="content" key="content-dash">
                <Title name="Atendimentos" key="title-dash">
                    <FiMessageSquare size={25} key="btn-title-dash"/>
                </Title>

                {chamados.length === 0 ? (
                    <div className="container dashboard" key="container-dash">
                        <span key="span1-dash">Nenhum chamado registrado</span>
                        <Link to="/new" className="new" key="link1-dash">
                            <FiPlus size={25} color="#FFF" key="btn1-dash"/>
                            Novo Chamado
                        </Link>
                    </div>
                )
                :(
                    <>
                    <Link to="/new" className="new" key="link2-dash">
                        <FiPlus size={25} color="#FFF" key="bnt-2-dash"/>
                         Novo Chamado                         
                    </Link>
                    <table key="table-dash">
                        <thead key="thead-dash">
                            <tr key="tr-dash">
                                <th scope="col" key="th-dash-cliente">Cliente</th>
                                <th scope="col" key="th-dash-assunto">Assunto</th>
                                <th scope="col" key="th-dash-status">Status</th>
                                <th scope="col" key="th-dash-abertura">Cadastrado Em</th>
                                <th scope="col" key="th-dash-#" >#</th>
                            </tr>
                        </thead>
                        <tbody key="tbody-dash">
                            {(loading || !chamados) ? (
                                <tr key='tr-dash-without'>
                                    <td key="loading-dash-without">Loading...</td>
                                </tr>                                
                            )
                        :(
                            chamados.map((e)=>{
                                    return(
                                        <tr key={'tr-dash' + e.id}>
                                            <td data-label="Cliente" key={ "td-Cliente" + e.id} >{e.cliente}</td>
                                            <td data-label="Assunto" key={'td-assunto' + e.id}>{e.assunto}</td>
                                            <td data-label="Status" key={'td-status' + e.id}>
                                                <span className="badge" style={{backgroundColor: e.status == 'Aberto' ? '#5cb85c': '#999'}} key={'span3-dash-' + e.id}> {e.status}</span>
                                            </td>
                                            {/* <td data-label="Cadastrado">{new Date(e.abertura ).getDate()+1 + '-' +(new Date(e.abertura).getMonth()+1) + '-' + new Date(e.abertura ).getFullYear()}</td> */}
                                            <td data-label="Cadastrado" key={'td-abertura' + e.id}>{format(new Date(e.abertura ),'dd-MM-yyyy')}</td>

                                            <td data-label="#" key={'td4-dash' + e.id}>
                                                <button className="action" style={{backgroundColor:'#3583f6'}} onClick={()=>toglePostModal(e)} key={'search-dash' + e.id}>
                                                    <FiSearch color="#FFF" size={17} key={'btnsearch-dash' + e.id}/>
                                                </button>
                                                <Link to={"/new/" + e.id} className="action" style={{backgroundColor:'#f6a935'}} key={'edit-dash' + e.id}>
                                                    <FiEdit2 color="#FFF" size={17} key={'btnEdit-dash' + e.id}/>
                                                </Link>
                                            </td>
                                        </tr>

                                    )
                                })

                            )}
                                
                            
                        </tbody>
                    </table>
                    </>
                )
            }
            {showPostModal && (
                <Modal conteudo={detail} close={toglePostModal}/>
            )} 

            <div>
                <button onClick={() => handleMais()}>Mais</button> 
            </div>                 

            </div>  
                  
             
        </div>
        
            
    )
}