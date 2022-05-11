import {Link} from 'react-router-dom';
function Erro(){
     return(
         <div>
             <h2>Ops, Pagina não existe</h2><br/>
             <Link to='/'>Home</Link>
         </div>

     );
 }

 export default Erro;