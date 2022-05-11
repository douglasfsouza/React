import { Link } from "react-router-dom";
import './style.css';

function Header(){
    return(
        <header>      
            <h2>Douglas</h2>     
            <div className="menu">
                <Link to='/'>Home</Link>
                <Link to='/contato'>Contato</Link>
                <Link to='/sobre'>Sobre</Link>
            </div>
        </header>
    )
}
export default Header;