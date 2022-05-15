import { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import api from '../../services/api';
function Filme(){
    const {id} = useParams();
    const [filme,setFilme] = useState({});
    const [produtoras,setProdutoras] = useState([]);
    const [contProd,setContProd]= useState(0);
    const [filmesFavoritos, setFilmesFavoritos] = useState([]);

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
        }
        else{
            console.log('ja foi salvo antes');
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
            })
            .catch(()=>{
                console.log(`Filme nao encontrado:${id}`);
            })
            
        }
        loadMovie();
    },[])
    
    return(
        <div key={id} className="detFilme">
            <div>
                <h1>Detalhes do Filme {filme.title}</h1>
            </div>
            <div className='doisfilmes'>
                <div className='imgA'>
                    <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}` } className='filme'></img>
                </div>
                <div className='imgB'>
                    <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}` } className='filme'></img>
                </div>
            </div>      
             
            
            <div className='tituloOriginal'>
                <span>Id: {id}</span><br/>
                <span>Titulo Original: {filme.original_title}</span>
                <span>Data de Lançamento: {filme.release_date}</span>                
                <span>Popularidade: {filme.popularity}</span><br/>
                <span>Homepage: {filme.homepage}</span><br/>
                <span>Sinopse: {filme.overview}</span><br/>
                <span>Produtoras:</span>
                
                 
                {produtoras.map((x, y=0)=>{                 
                    return(                        
                        <span> {y==0 ? null:','} {x.name}     </span>
                    )

                })}
                <div key='divProdutoras' className='produtoras'>
                    
                    <ul key='produtoras'>
                        {produtoras.map((x)=>{
                            return(                                                                  
                                    <img className='imgProdutoras' src={`https://image.tmdb.org/t/p/original/${x.logo_path}` } ></img> 
                                                              
                            )                            
                        })}               
                                    
                    </ul>
                    
                </div>
                
            </div>
            <div className='tarefasFilme'>
                <label className='botoes' onClick={salvar}>Salvar</label>
                <a href='#' className='botoes'>Trailer</a>
            </div>
        </div>
        
    )
}
export default Filme;