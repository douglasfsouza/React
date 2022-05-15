import axios from 'axios';
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
function Home(){
    const [filmes,setFilmes] = useState([]);

    useEffect(()=>{
        async function loadFilmes(){
            const response = await api.get("movie/now_playing",{
                params:{
                    api_key: "2263249d6015ce9991b7e66fed701491",
                    language:"pt-BR",
                    page: 1
                }
            });

            setFilmes(response.data.results);
            console.log("filmes:");
            console.log(filmes);            
            
        }

        loadFilmes();
    },[])
    return(
        <div>
             <h1>Filmes Lançamentos</h1><br/>
             {filmes.map((x) => {
                 return(                    
                     <div>
                        <div className='container'>
                            <div className='titulo'>
                              <strong key={x.id} >{x.title} - {x.original_title}</strong>
                            </div>
                                                                           
                            <img src={`https://image.tmdb.org/t/p/original/${x.poster_path}` } className="poster"></img>
                            <Link to={`/filme/${x.id}`} className='botoes'>Acessar</Link>                            
                             
                            <div className='overview'>
                                <p>{x.overview}</p>
                            </div>
                         </div>
                     </div>
                 )                   
                
             })}
        </div>       
    )
}
export default Home;