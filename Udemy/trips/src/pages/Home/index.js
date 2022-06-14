import { useEffect, useState } from "react"; 
import React from "react";
import {useDispatch} from 'react-redux';
import api from '../../services/api';
import {MdFlightTakeoff} from 'react-icons/md';
import './style.css';
import {addReserveRequest} from '../../store/modules/reserve/actions';

export default function Home({history}){
    const dispatch = useDispatch();
    const [trips, setTrips] = useState([]);

    useEffect(()=>{
        async function loadApi(){
            const response = await api.get('trips');
            setTrips(response.data);
        }

        loadApi();
    },[]);

    function handleReserve(id){      
        dispatch(addReserveRequest(id));
       
    }
    return(
        <div key="div-1-home">
            <div key="div-box" className="box">
                {trips.map((t)=>(
                    <li key={'span-1-' + t.id}>
                        <img key={'img-home-' + t.id} src={t.image} alt={t.title}/>
                        <strong> {t.title}</strong>
                        <span>Status:{t.status === true ? 'Disponível' : 'Indisponível'}</span>
                        <button key={'button-1-home-' + t.id} onClick={()=>handleReserve(t.id)}>
                            <MdFlightTakeoff size={20} color="#FFF" key={'icon-1-home-' + t.id}/>
                            <span key={'span-2-hhome-' + t.id}>Solicitar reserva</span>
                        </button>
                    </li>
                ))}
            </div>
        </div>
    )
}