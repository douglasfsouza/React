import { useContext, useState, React } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { AuthContext } from '../../contexts/auth';

function SignUp(){
    const [nome,setNome] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {signUp, loadingAuth} = useContext(AuthContext);

    function handleSubmit(e){
        e.preventDefault();
        if (nome || '' && email != '' && password != ''){
            signUp(nome,email,password);
        }
    }
    return(
        <div className='container-center'>
            <div className='login'>
                <div className='logo-area'>
                    <img src={logo} alt="Sistema de Chamados"></img>
                </div>
                <form onSubmit={handleSubmit}>
                    <h1>
                        Cadastrar uma conta
                    </h1>
                    <input type="text" placeholder="seu nome" value={nome} onChange={(e)=>setNome(e.target.value)}/>
                    <input type="text" placeholder="email@email.com" value={email} onChange={(e)=> setEmail(e.target.value)}></input>
                    <input type="password" placeholder='*****' value={password} onChange={(e)=> setPassword(e.target.value)}></input>
                    <button type='submit'>{loadingAuth ? "Carregando..." : "Cadastrar"}</button>

                </form>
                <Link to='/'>Já tem uma conta ? Entre</Link>

            </div>
             
        </div>
    )
}
export default SignUp;