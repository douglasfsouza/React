import { useEffect, useState } from 'react';
import {MdAddToQueue,MdOutlineFindInPage, MdDelete, MdEdit} from 'react-icons/md';
import {Link} from 'react-router-dom';
import './home.css';
import {format} from 'date-fns';
import { toast } from 'react-toastify';

export default function Home(){
    const [ano, setAno] = useState(new Date().getFullYear());
    const [mes, setMes] = useState("Janeiro");
    const [indexMes, setIndexMes] = useState(1);
    const [tipo, setTipo] = useState("Todos");
    const [find, setFind] = useState("");
    const [dsps, setDsps] = useState([]);
    const [debito, setDebito] = useState(0);
    const [credito, setCredito] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [usu, setUsu] = useState(1198);

    const baseURL = "http://192.168.15.42:63351/api/Despesas";
    const baseURL2 = "http://192.168.15.42/api/Despesas";
    const baseURL1 = "https://20.226.29.149/dsp/api/Despesas";

    async function loadDsp(search){
        if (loading){
            return;
        }
        if (usu != 1198){
            console.log("usu:",usu);
            return;
        }
        console.log('loadDsp com mes ' + indexMes);
        
        let url = baseURL +  "/GetList";
        if (search){
            url = baseURL + "/GetListSearch";
        }
        let body = [];
        if (search){
            body = [
                {
                    Field: "Descricao",
                    Operator: "eq",
                    Value: find
                }
            ]
        }
        else{
            body = [
                {
                    Field: "Ano",
                    Operator: "eq",
                    Value: ano.toString()
                },
                {
                    Field: "Mes",
                    Operator: "eq",
                    Value: indexMes.toString()
                }            
               ];
            if (tipo){
                if (tipo !== 'Todos'){
                    let indexTipo = 'c';
                    if (tipo === 'Débito')
                        indexTipo = 'd';
    
                    body.push({
                        Field: "Tipo",
                        Operator: 'eq',
                        Value: indexTipo
                    });
                }
            }            
        } 
        
        getSummary();

        await fetch(url,{method:'POST', body:JSON.stringify(body), Accept:'*/*', headers: new Headers({
            'Content-Type' : 'Application/json;charset=UTF-8'
        })})
        .then((r)=> {
            return r.json();
        })
        .then((e) => {
            console.log(e);
            setDsps(e);
        })
        .catch((e)=>{
            console.log("Erro ao carregar dados. Erro:" + e);
            toast.error("Erro ao carregar dados. Erro: " + e);
        })
    }

    useEffect(()=>{
        let month = new Date().getMonth() + 1;
        setIndexMes(month);
        switch (month){
            case 1:
                setMes('Janeiro');
                break;
            case 2:
                setMes('Fevereiro');
                break;
            case 3:
                setMes('Março');
                break;
            case 4:
                setMes('Abril');
                break;
            case 5:
                setMes('Maio');
                break;
            case 6:
                setMes('Junho');
                break;
            case 7:
                setMes('Julho');
                break;
            case 8:
                setMes('Agosto');
                break;   
            case 9:
                setMes('Setembro');
                break;
            case 10:
                setMes('Outubro');
                break;
            case 11:
                setMes('Novembro');
                break;
            case 12:
                setMes('Dezembro');
                break;
            default:
                break;
        }  
        loadDsp(false);
        setLoading(false);
        
    },[])

    useEffect(()=>{           
        loadDsp(false);        
    },[tipo, ano, mes, usu]);
     

    function handleChangeYear(e){
        setAno(e.target.value);
    }
    function handleChangeMonth(e){        
        if (e.target.selectedIndex >= 0){
            setMes(e.target.value);
            setIndexMes(e.target.selectedIndex + 1)
            console.log('setMes ' + e.target.value );
        }    
    }

    function handleChangeType(e){
        setTipo(e.target.value);
    }

    function handleChangeFind(e){
        setFind(e.target.value);
    }

    function handleFind(){
        if (usu != 1198){
            return;
        }
        if(find == ''){
            let msg = "Texto de busca não informado";
            toast.warn(msg);
            console.log(msg);
            return;
        }
        loadDsp(true);
    }

    async function getSummary(){    
        if (usu != 1198){
            return;
        }    
        let url = baseURL +  "/GetListSummary";
         
        let body = [
                {
                    Field: "Ano",
                    Operator: "eq",
                    Value: ano.toString()
                },
                {
                    Field: "Mes",
                    Operator: "eq",
                    Value: indexMes.toString()
                }            
               ];
            if (tipo){
                if (tipo !== 'Todos'){
                    let indexTipo = 'c';
                    if (tipo === 'Débito')
                        indexTipo = 'd';
    
                    body.push({
                        Field: "Tipo",
                        Operator: 'eq',
                        Value: indexTipo
                    });
                }
            }
            if (find !== ''){
                body.push({
                    Field: "Descricao",
                    Operator: "eq",
                    Value: find
                })
            }
                

        await fetch(url,{method:'POST', body:JSON.stringify(body), Accept:'*/*', headers: new Headers({
            'Content-Type' : 'Application/json;charset=UTF-8'
        })})
        .then((r)=> {
            return r.json();
        })
        .then((e) => {
            console.log(e);
            setCredito(0);
            setDebito(0);
            setTotal(0);
            let newTotal = 0;
            e.map((s)=>{             
                    if (s.tipo === 'c'){
                        setCredito(s.valor);                       
                    }
                    else{
                        setDebito(s.valor);                        
                    }    
                    newTotal += s.valor;
                    setTotal(newTotal);            
            })
        })
        .catch((e)=>{
            console.log("Erro ao carregar totais. Erro:" + e);
            toast.error("Erro ao carregar totais. Erro: " + e);
        })
    } 

    async function handleDel(id){        
        let url = baseURL +  "/" + id;         

        await fetch(url,{method:'DELETE', Accept:'*/*', headers: new Headers({
            'Content-Type' : 'Application/json;charset=UTF-8'
        })})
        .then((r)=> {
            return r.json();
        })
        .then((e) => {
          toast.success('Despesa excluida');  
          loadDsp();
        })
        .catch((e)=>{
            console.log("Erro ao excluir a despesa. Erro:" + e);
            toast.error("Erro ao excluir. Erro: " + e);
        })
    }

    function handleUsu(e){
        setUsu(e.target.value);
    }

    return(
        <div>
            <div className="header">
                <form className='form'>
                    <div className='firstFields'>
                        <label className='labels'>Ano:</label>
                        <input className='inputs' type="number" value={ano} onChange={(e)=>handleChangeYear(e)}/>

                        <label className='labels'>Mês:</label>
                        <select value={mes} onChange={(e)=>handleChangeMonth(e)}>
                            <option>Janeiro</option>
                            <option>Fevereiro</option>
                            <option>Março</option>
                            <option>Abril</option>
                            <option>Maio</option>
                            <option>Junho</option>
                            <option>Julho</option>
                            <option>Agosto</option>
                            <option>Setembro</option>
                            <option>Outubro</option>
                            <option>Novembro</option>
                            <option>Dezembro</option>
                        </select>

                        <label className='labels'>Tipo:</label>
                        <select value={tipo} onChange={(e)=>handleChangeType(e)}>
                            <option>Débito</option>
                            <option>Crédito</option>
                            <option>Todos</option>
                        </select>


                        <Link to={usu==1198 ? '/edit/0' : '#'}  className='button, icon-add'  >
                            <MdAddToQueue size={15} visibility={usu==1198?'visible':'hidden'} className="icon-add" />                            
                        </Link>
                    </div>                    

                    <label>Débito:</label>
                    <label className='totals'>{debito.toFixed(2)}</label>

                    <label>+</label>

                    <label>Crédito:</label>
                    <label className='totals'>{credito.toFixed(2)}</label>

                    <label>=</label>

                    <label className='totals'>{total.toFixed(2)}</label>

                    <div className='find'>
                        <input className='txtFind' type="text" value={find} onChange={(e)=>handleChangeFind(e)} /> 
                        <MdOutlineFindInPage className='findIcon' onClick={()=>handleFind()}/>
                    </div>  

                    <div>
                        <label>Codigo:</label>
                            <input className='usu' type="text" value={usu} onChange={(e)=>handleUsu(e)}/>
                    </div>                  
                </form>

                <table className='tabela'>
                    <thead>
                        <tr className='headertable'>                        
                            <th> Código </th>
                            <th> Data</th>
                            <th> Descrição </th>
                            <th> Tipo </th>
                            <th> Valor </th>
                            <th> Exc </th>
                            <th> Alt </th>
                        </tr>
                    </thead>

                    <tbody>
                        
                        {dsps.map((d)=>{
                            return(
                                <tr className='tableDetail' key={'tr-' + d.id}>
                                    <td key={d.id}>{d.id}</td>

                                    <td>{format(new Date(d.data),'dd/MM/yyyy')}</td>
                                    <td>{d.descricao}</td>
                                    <td>{d.tipo  === 'd' ? 'Débito' : 'Crédito'}</td>
                                    <td>{d.valor.toFixed(2)}</td>
                                    <td>
                                        <MdDelete onClick={()=>handleDel(d.id)} className="iconAct"/>
                                    </td>
                                    <td>
                                        <Link to={'/edit/' + d.id}>
                                            <MdEdit className="iconAct" />
                                        </Link>
                                        
                                    </td>
                                </tr>
                            )
                        } )  
                    }        
                    </tbody>   
                </table>
            </div> 
        </div>
    )
}