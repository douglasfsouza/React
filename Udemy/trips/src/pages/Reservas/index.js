 import React from "react";
 import {MdDelete} from 'react-icons/md';
 import {useDispatch, useSelector} from 'react-redux';
 import './style.css';
 import {delReserve} from '../../store/modules/reserve/actions';
 

 export default  function Reservas({history}){
     const reserves = useSelector(state => state.reserve);
     const dispatch = useDispatch();

     function handleDelete(id){
         dispatch(delReserve(id));
     }

     function solicitar(){
         history.push('/');
     }
     return(
         <div> 
             <h1 className="title">Você solicitou {reserves.length} reserva(s)</h1>
             {reserves.map((r)=>(
                 <div key={'div-reservas-d' + r.id} className="reservas">
                 <img key={'img-reservas' + r.id} src={r.image}
                 alt = {r.title}
                 
                 />
                 <strong key={'strong-reservas-' + r.id}>
                     {r.title}
                 </strong>
                 <span key={'span-1-reservas-' + r.id}>Quantidade {r.amount}</span>
                 <button key={'btn-1-reservas-' + r.id} type="button" onClick={()=>handleDelete(r.id)} >
                     <MdDelete key={'icon-1-reservas-' + r.id} size={20} color="#191919"/>
                 </button>
             </div>

             ))}
             

             <footer>
                 <button type="button" onClick={()=>solicitar()}>
                     Voltar
                 </button>
             </footer>
            
         </div>
     )
 }