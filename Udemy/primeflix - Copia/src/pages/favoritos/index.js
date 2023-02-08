import { useEffect,useState } from "react";
import { toast } from "react-toastify";
import api from '../../services/api';


 function Favoritos(){
      const [filmes,setFilmes] = useState([]);
      const [filme,setFilme] = useState({});

      useEffect(()=>{
         function loadFavorites(){
              const movies = localStorage.getItem('movies');
              if (movies){
                    console.log('load favorites');
                    console.log(JSON.parse(movies));            

                    let jmovies = JSON.parse(movies);
                    
                    jmovies.map((x)=>{                       
                        return(
                            loadMovie(x)
                        )                          
                    })                    
              }
         }

         loadFavorites();
     },[])

     async function loadMovie(id){
        await api.get(`/movie/${id}`,{
            params:{
                api_key: "2263249d6015ce9991b7e66fed701491",
                language:"pt-BR",
                page: 1
            }
        })
        .then((response)=>{
            if (filmes.find(x => x.id == id) == null){
                console.log('carregando o filme: ' + id );
                console.log(response.data);
                setFilme(response.data);  
               // debugger;
                let nmovies = filmes;

                nmovies.push({id:response.data.id, descricao:response.data.title});
                setFilmes(nmovies)    
            }
                 
        })
        .catch(()=>{
            console.log(`Filme nao encontrado:${id}`);
        })        
    }

    function excluir(e){
        console.log("Excluir o filme :  " + e.target.id);
        let newMovies = [];
        let newFilmes = [];
        let movies = filmes;
        
        movies.map((x)=>{
            if (x.id != e.target.id){
                
                newMovies.push(x.id);
                newFilmes.push({id:x.id, descricao:x.descricao});
            }  
        })
        
        localStorage.setItem('movies',JSON.stringify(newMovies));
        setFilmes(newFilmes);   
        toast.success("Filme excluido da lista");    
    }
    
     return(
         <div key={'favoritos'} className="favoritos">
             <div key={'h11_favoritos'}>
                 <h1>Meus filmes Favoritos</h1>
             </div>

             <div key={'favoritos_lista'}>
                <ul>
                     {filmes.map((x)=>{
                         return(
                            <li key={'li_favoritos_' + x.id}>
                                <span key={'descricao_favoritos_' + x.id}>{x.descricao}  </span>
                                <label key={'label_favoritos_2_' + x.id} id={x.id} className="botoes" onClick={excluir}> Excluir</label><br/>
                                
                            </li> 
                         )
                     })}
                     
                 </ul>
             </div>           
         </div>        
     )

 }

 export default Favoritos;