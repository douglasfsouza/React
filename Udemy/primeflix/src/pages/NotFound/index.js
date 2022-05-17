import { Link } from "react-router-dom";

function NotFound(){
    return(
        <div className="paginaErro" >
            <span className="erro404">404</span>
            <h1>Filme não encontrado</h1>
            <Link to='/'>Home</Link>
        </div>
    )
        
    
}
export default NotFound;