import Routes from "./routes";
import GlobalStyle from './styles/global';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

function App() {
  return (
    < >
    <ToastContainer autoClose={3000}/>
    <GlobalStyle/>
     <Routes/>  
      
    </>
  );
}

export default App;
