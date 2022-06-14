import {call, put, all, takeLatest} from 'redux-saga/effects';
import api from '../../../services/api';
import {addReserveSuccess} from './actions';
import history from '../../../services/history';

function* addToReserve({id}){
    debugger; 
    const response = yield call(api.get, `trips/${id}`)

    yield put(addReserveSuccess(response.data));
    //history.push('/reservas');

}

export default all([
  takeLatest('ADD_RESERVE_REQUEST',addToReserve)  
])