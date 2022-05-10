import React from "react";
import {Link} from 'react-router-dom';
function Home(){
    return(
        <div>
            <h1>Pagina Home</h1>
            <Link to='/contato'>Contato</Link><br/>
            <Link to='/sobre'>Sobre</Link>
        </div>
        
    )
}

export default Home;