import './profile.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import {FiSettings, FiUpload} from 'react-icons/fi';
import {useContext,useState, React} from 'react';
import {AuthContext} from '../../contexts/auth';
import avatar from '../../assets/avatar.png';

export default function(){
    const {user, signOut, setUser,storageUser} = useContext(AuthContext);
    const [nome,setNome] = useState(user && user.nome);
    const [email,setEmail] = useState(user && user.email);
    const [avatarURL,setAvatarURL] = useState(user && user.avatarURL);
    const [imageAvatar, setImageAvatar] = useState(null);

    async function handleSave(e){
        e.preventDefault();
        if (imageAvatar != null || nome != null){
            let url = "http://localhost:61749/User/update";
        
            let body = {Nome:nome, Email:email, avatarURL: avatarURL};
            debugger;
            await fetch(url, {method:'PATCH',body:JSON.stringify(body), headers: new Headers({
                'Content-Type': 'application/json;charset=UTF-8'
            })})
            .then((r)=> {
                return r.json();
            })
            .then((x)=>{
                console.log(x);
                let data = {
                    uid: x.id,
                    nome: x.nome,
                    email: x.email,
                    avatarURL: x.avatarURL
                };
                setUser(data);
                storageUser(data);                 
            })
            .catch((ex)=>{
                debugger;
                console.log(ex);                 
            })   
        }
    }

    function handleFile(e){
        e.preventDefault();
        const image = e.target.files[0];
        if (image != null){
            if (image.type === 'image/jpeg' || image.type === 'image/png'){
                console.log(image);
                setAvatarURL(URL.createObjectURL(image));
                setImageAvatar(image);
            }
            else{
                alert("Informe uma imagem do tipo jpeg ou png");
            }           
        }
    }    
    
    return(        
        <div>
            <Header/> 
            <div className='content'>
                    <Title name="Meu perfil">
                        <FiSettings size={25}/>

                    </Title>
                    <div className='container'>
                        <form className='form-profile' onSubmit={handleSave}>
                            <label className='label-avatar'>
                                <span>
                                    <FiUpload color='#FFF' size={25}/>
                                </span>
                                <input type="file" accept="image/*" onChange={handleFile}/>
                                {avatarURL == null ?    
                                    <img src={avatar} width='250px' height='250px'></img>
                                :   <img src={avatarURL} width='250px' height='250px'></img>
                                }
                            </label>
                            <label>Nome</label>
                            <input type="text" value={nome} onChange={(e)=>setNome(e.target.value)}/>

                            <label>Email</label>
                            <input type="email" value={email} disabled={true} />
                            <button type='submit'>Salvar</button>
                        </form>

                    </div>
                    <div className='containerx'>
                        <button className='logout-btn' onClick={()=>{signOut()}}>Sair</button>
                    </div>
            </div>        
        </div>
    )
}