import './customers.css';
import Title from '../../components/Title';
import Header from '../../components/Header';
import {FiUser} from 'react-icons/fi';
import { useState, React } from 'react';
import { toast } from 'react-toastify';

export default function(){
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');

    async function handleAdd(e){
        e.preventDefault();
        if (nomeFantasia != '' && cnpj != '' && endereco != ''){
            let url = "http://localhost:61749/Customer/insert";
            let body = {NomeFantasia: nomeFantasia, CNPJ: cnpj, Endereco: endereco};
            fetch(url, {method:'post',body:JSON.stringify(body), headers: new Headers({
                'Content-Type': 'application/json;charset=UTF-8'            
            })})
            .then((r)=>{
                return r.json();
            })
            .then((x)=> {
                 setNomeFantasia('');
                 setCnpj('');
                 setEndereco('');
                 toast.success("Cliente cadastrado com sucesso");
            })
            .catch((e)=>{
                console.log(e);
                toast.error("Erro ao cadastrar a emppresa");
            })

        }
        else{
            toast.error("Preencha todos os campos");
        }
        
    }
    return(
        <div>             
            <Header/>      
            <div className='content'>
                    <Title name="Clientes">
                        <FiUser size={25}/>
                    </Title>
                    <div className='container'>
                        <form className='form-profile customers' onSubmit={handleAdd}>
                            <label>Nome Fantasia</label>
                            <input type="text" value={nomeFantasia} onChange={(e)=>setNomeFantasia(e.target.value)}/> 

                            <label>CNPJ</label>
                            <input type="text" value={cnpj} onChange={(e)=>setCnpj(e.target.value)}/> 

                            <label>Endereço</label>
                            <input type="text" value={endereco} onChange={(e)=>setEndereco(e.target.value)}/> 

                            <button type='submit'>Salvar</button>

                        </form>

                    </div>
            </div>      
        </div>
    )
}