import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Filme from './pages/Filme';
import Home from './pages/Home';
import Favoritos from './pages/favoritos';
import NotFound from './pages/NotFound';
function RoutesApp(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/filme/:id' element={<Filme/>}/>
                <Route path='/favoritos' element={<Favoritos/>} />
                <Route path='*' element={<NotFound/>}/>
               
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;