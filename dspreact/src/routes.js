import {BrowserRouter,Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Edit from './pages/Edit';
export default function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/> 
                <Route path="/edit/:id" element={<Edit/>} />
            </Routes>
        
        
        </BrowserRouter>
    )
}