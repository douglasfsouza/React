import Header from '../../components/Header';
import Title from '../../components/Title';
import './new.css';
import {FiPlus} from 'react-icons/fi';
import { useContext, useEffect, useState, React } from 'react';
import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify';
import {useHistory, useParams} from 'react-router-dom';
export default function(){
    const {id} = useParams();
    const history = useHistory();
    const [loadingCustomers, setLoadingCustomers] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [customerSelected, setCustomerSelected] = useState(0);
    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState("Aberto");
    const [complemento, setComplemento] = useState('');
    const {user} = useContext(AuthContext);

    useEffect(()=>{
        async function loadCustomers(){
            let url = "http://localhost:61749/Customer/getCustomers";
        
            debugger;
            await fetch(url, {method:'GET', headers: new Headers({
                'Content-Type': 'application/json;charset=UTF-8'
            })})
            .then((r)=> {
                return r.json();
            })
            .then((x)=>{
                if (x.length !==0){
                    console.log(x);
                    setCustomers(x);
                    setLoadingCustomers(false);
                    console.log("customers:");
                    console.log(customers);
                    debugger;   

                    if (id){
                        loadId(x);
                    }
                }
                          
                               
            })
            .catch((ex)=>{
                debugger;
                console.log(ex);   
                setLoadingCustomers(false);
                setCustomers({id:0, nomeFantasia: ''});
                toast.error("Erro ao carregar clientes");              
            })  

        }
        loadCustomers();
    },[])

    async function loadId(lista){
        let url = "http://localhost:61749/Issue/getIssue?Id=" + id;
        fetch(url,{method: 'GET', headers: new Headers({
            'Content-Type' : 'application/json;charset=UTF-8'
        })})
        .then((r)=> {
            return r.json();
        })
        .then((x)=> {
            if (x.id ){
                debugger;

                let index = lista.findIndex(index => index.id == x.idCliente);
                setCustomerSelected(index);
                setComplemento(x.complemento);
                setAssunto(x.assunto);
                setStatus(x.status);
            }
            else{                 
                toast.error(x);
            }            
            
        })
        .catch((ex)=>{
            console.log(ex);
            toast.error("Erro ao carregar o chamado: " + ex);
        }) 

    }

    async function handleSave(e){
        e.preventDefault();
        debugger;   
        let url = null;
        let method = null;
        let body = null;
        if (!id){
            url = "http://localhost:61749/Issue/insert";
            method = 'POST';
            body = {Abertura: new Date(),Assunto: assunto, IdCliente: customers[customerSelected].id, Status: status, Complemento: complemento, UserId: user.uid};
        }
        else{
            url = "http://localhost:61749/Issue/update";
            method = 'PATCH';
            body = {Assunto: assunto, IdCliente: customers[customerSelected].id, Status: status, Complemento: complemento, UserId: user.uid, Id: id};
        }
           
        fetch(url,{method: method, body:JSON.stringify(body), headers: new Headers({
            'Content-Type' : 'application/json;charset=UTF-8'
        })})
        .then((r)=> {
            return r.json();
        })
        .then((x)=> {
            if (x.id ){
                if (!id){
                     toast.info("Criado o chamado: " + x.id);
                }
                else{
                    toast.info("Chamado atualizado!");
                    history.push('/dashboard');
                }                
               
                setComplemento('');
                setCustomerSelected(0);
            }
            else{                 
                toast.error(x);
            }            
            
        })
        .catch((ex)=>{
            console.log(ex);
            toast.error("Erro ao gravar o chamado: " + ex);
        }) 
    }

    function handleChangeSelect(e){         
        setAssunto(e.target.value);
    }

    function handleChangeCustomer(e){         
        setCustomerSelected(e.target.value);
    }
  
    return(
        <div>
            <Header/>
            <div className='content'>
                <Title name="Novo Chamado">
                    <FiPlus size={25}/>

                </Title>
                <div className='container'>
                    <form className='form-profile' onSubmit={handleSave}>
                        <label>Cliente:</label>

                        {loadingCustomers ? (
                            <input type="text" value = "Carregando..."/>
                        ):(
                            <select value = {customerSelected} onChange={handleChangeCustomer}>
                                {customers.map((x, index)=>{
                                    return(
                                        <option key={x.id} value={index}>
                                            {x.nomeFantasia}
                                        </option>
                                    )
                                })}                            
                                
                            </select>

                            )                        
                        }                       
                        

                        <label>Assunto:</label>

                        <select value={assunto} onChange={handleChangeSelect}>
                            <option value={"Suporte"}>Suporte </option>
                            <option value={"Visita Tecnica"}> Visita Tecnica</option>
                            <option value={"Financeiro"}> Financeiro</option>
                        </select>

                        <label>Status:</label>
                        <div className='status'>
                            <input type="radio" name="radio" value="Aberto" onChange={()=> setStatus("Aberto")} checked={status === "Aberto" ? true : false}/>
                            <span>Em Aberto</span>

                            <input type="radio" name="radio" value="Progresso" onChange={()=> setStatus("Progresso")} checked={status === "Progresso" ? true : false}/>
                            <span>Em Progresso</span>

                            <input type="radio" name="radio" value="Atendido" onChange={()=>setStatus("Atendido")} checked={status === "Atendido" ? true : false}/>
                            <span>Atendido</span>
                        </div>

                        <label>Complemento:</label>
                        {/* <textarea type="text" placeholder="Descreva seu problema" value={customers.length === 0 ? complemento : customers[customerSelected].nomeFantasia} onChange={(e)=>setComplemento(e.target.value)}/> */}
                        <textarea type="text" placeholder="Descreva seu problema" value={complemento} onChange={(e)=>setComplemento(e.target.value)}/>

                        <button className='action' type='submit'>Salvar</button>                        

                    </form>
                </div>
            </div>    
             
        </div>
    )
}