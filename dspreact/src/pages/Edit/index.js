import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './edit.css';
import {toast} from 'react-toastify';
import {format} from 'date-fns';

export default function Edit(){
    const [data, setData] = useState(format(new Date(),'yyyy-MM-dd'));
    const [descricao, setDescricao] = useState('');
    const [tipo, setTipo] = useState('Crédito');
    const [valor, setValor] = useState(0);
    const id = useParams();

    const baseURL = "http://192.168.15.42:63351/api/Despesas";
    const baseURL2 = "http://192.168.15.42/api/Despesas";
    const baseURL1 = "https://20.226.29.149/dsp/api/Despesas";
    
    useEffect(()=>{
        loadDsp();
    },[]);

    function handleData(e){
        setData(e.target.value);
    }

    async function handleSubmit(e){
        e.preventDefault();

        if (!valor){
            toast.warn("Valor inválido!");
            return;
        }

        if (valor === undefined || valor === null || valor === ''){
            toast.warn("Valor inválido!");
            return;
        }

        if (valor <= 0){
            toast.warn('Valor inválido');            
            return;
        }         

        if (descricao === ''){
            toast.warn('Descricação não informada')
            return;
        }

        let tipoIndex = 'c';

        if (tipo == "Débito") tipoIndex = 'd';

        let url = baseURL;

        if (id.id != 0 ){
            url = baseURL +  "/" + id.id;
        }
        
        let body = {
            id:parseInt(id.id),
            data: data,
            descricao: descricao,
            tipo: tipoIndex,
            valor: parseFloat(valor)
        }

        let method = 'POST';
        if(id.id != 0 ){
            method = 'PUT';
        }

        await fetch(url,{method: method, body:JSON.stringify(body), Accept:'*/*', headers: new Headers({
            'Content-Type' : 'Application/json;charset=UTF-8'
        })})
        .then((r)=>{
            toast.success("Dados  gravados com sucesso");             
        } )        
        .catch((e)=>{
            toast.error("Erro ao gravar dados. Erro: " + e);
            console.log('"Erro ao gravar dados. Erro: " + e');
        })
    }

    async function loadDsp(){
        if (!id){
            return;            
        }
        if (!id.id){
            return;
        }

        if (id.id === "0") return;

        let url = baseURL +  "/" + id.id;
       

        await fetch(url,{method:'GET',  Accept:'*/*', headers: new Headers({
            'Content-Type' : 'Application/json;charset=UTF-8'
        })})
        .then((r)=> {
            return r.json();
        })
        .then((e) => {
            if (e){
                setDescricao(e.descricao);
                setData(format(new Date(e.data),'yyyy-MM-dd'));
                setValor(e.valor);
                
                if (e.tipo == 'd')
                    setTipo("Débito");
                else
                    setTipo("Crédito");                
            }
        })
        .catch((e)=>{
            console.log("Erro ao carregar dados. Erro:" + e);
            toast.error("Erro ao carregar dados. Erro: " + e);
        })
    }
    return(
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="grupos">
                   <label>Data:</label>
                   <input type="date" value={data} onChange={(e)=>handleData(e)}/>
                </div>

                <div className="grupos">
                   <label>Descrição:</label>
                   <input type="text" className="descricao" value={descricao} onChange={(e)=>setDescricao(e.target.value)}/>
                </div>

                <div className="grupos">
                   <label>Tipo:</label>
                   <select value={tipo} onChange={(e)=>setTipo(e.target.value)}>
                        <option>Débito</option>
                        <option>Crédito</option>
                   </select>
                </div>

                <div className="grupos">
                   <label>Valor </label>
                   <input type="number" className="valor" value={valor} onChange={(e)=>setValor(e.target.value)}/>
                </div>

                <div className="actions">
                    <button className="button" type="submit">Salvar</button>
                    <Link to="/" className="button">Voltar</Link>
                </div>
            </form>
        </div>
    )
}