import { useEffect, useState } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';

function Filme(){
    const {id} = useParams();
    const [filme,setFilme] = useState({});
    const [produtoras,setProdutoras] = useState([]);
    const [contProd,setContProd]= useState(0);
    const [filmesFavoritos, setFilmesFavoritos] = useState([]);
    const [loading,setLoading] = useState(true);
    const [notFound,setNotFound] = useState(false);
    const navigate = useNavigate();

    function loadParam(){
        alert(id);
    }    

    function salvar(){
     
        let fav = filmesFavoritos;
        if (fav.find(x => x == filme.id) == null)
        {
            fav.push(filme.id);
            setFilmesFavoritos(fav);
            localStorage.setItem('movies',JSON.stringify(fav));
            console.log("saved");
            toast.success('Salvo com sucesso!!');
        }
        else{
            console.log('ja foi salvo antes');
            toast.warn('Este filme já está salvo');
        }
    }

    useEffect(()=>{
        async function loadMovie(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key: "2263249d6015ce9991b7e66fed701491",
                    language:"pt-BR",
                    page: 1
                }
            })
            .then((response)=>{
                console.log('carregando o filme: ' + id );
                console.log(response.data);
                setFilme(response.data);
                setProdutoras(response.data.production_companies);
                const favoritos = localStorage.getItem('movies');
                if (favoritos){
                    setFilmesFavoritos(JSON.parse(favoritos));
                }
                setLoading(false);
            })
            .catch(()=>{
                console.log(`Filme nao encontrado:${id}`);
                //setNotFound(true); 
                //feito de duas formas, com a variavel notfound ou navigate         

                setLoading(false);   
                
                navigate("/notFound",{replace:true});
            })
            
        }
        loadMovie();
    },[])
    
    if (loading){
        return(
            <div key={'loading_' + id}>
                <h1>carregando ....</h1>
            </div>
        )
    }

    if (notFound){
        return(
            <div key={'notfound_' + id}>
                <h1>Filme não encontrado</h1>
            </div>
        )
    }

    return(
        <div key={'detMovie_' + id} className="detFilme">
            <div key={'titulo_' + id}>
                <h1 key={'titletext_' + id}>Detalhes do Filme {filme.title}</h1>
            </div>
            <div key={'doisfilmes_' + id} className='doisfilmes'>
                <div key={'imgleft_' + id} className='imgA'>
                    <img key={'poster_' + id} src={`https://image.tmdb.org/t/p/original/${filme.poster_path}` } className='filme'></img>
                </div>
                <div key={'imgright_' + id} className='imgB'>
                    <img key={'backdrop_' + id} src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}` } className='filme'></img>
                </div>
            </div>      
             
            
            <div key={'details_' + id} className='tituloOriginal'>
                <span key={'span1_' + id}> Id: {id}</span><br/>
                <span key={'span2_' + id}> - Titulo Original: {filme.original_title}</span>
                <span key={'span3_' + id}> - Data de Lançamento: {filme.release_date}</span>                
                <span key={'span4_' + id}> - Popularidade: {filme.popularity}</span><br/>
                <span key={'span5_' + id}> - Homepage: {filme.homepage}</span><br/>
                <span key={'span6_' + id}> - Sinopse: {filme.overview}</span><br/>
                <span key={'span7_' + id}> - Produtoras:</span>                
                 
                {produtoras.map((x, y=0)=>{                 
                    return(                        
                        <span key={'span_' + id + '_' + y}> {y==0 ? null:','} {x.name}     </span>
                    )
                })}
                <div key={'divProdutoras_' + id} className='produtoras'>
                    
                    <ul key={'produtoras_' + id}>
                        {produtoras.map((x)=>{
                            return(                                                                  
                                    <img key={'imgPro_' + id + x.logo_path} className='imgProdutoras' src={`https://image.tmdb.org/t/p/original/${x.logo_path}` } ></img>
                                                              
                            )                            
                        })}                                      
                    </ul>                    
                </div>
                
            </div>
            <div key={'tarefasFilme_' + id} className='tarefasFilme'>
                <label key={'label_filme_' + id} className='botoes' onClick={salvar}>Salvar</label>
                <a key={'link_' + id} target="_blank" rel="external" href={`https://www.youtube.com/results?search_query=${filme.title} trailer`} className='botoes'>Trailer</a>
            </div>
        </div>
        
    )
}
export default Filme;