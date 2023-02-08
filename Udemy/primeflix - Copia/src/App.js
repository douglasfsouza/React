import RoutesApp from "./routes";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
 
function App() {
  return (
    <div className="App">
        <h1>Prime Flix</h1>
        <ToastContainer autoClose={3000}/>
        <RoutesApp/>
    </div>
  );
}

export default App;
