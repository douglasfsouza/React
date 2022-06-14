export function addReserveRequest(id){
    return{
         type: 'ADD_RESERVE_REQUEST',
         id
    }   
}

export function addReserveSuccess(trip){
    return{
         type: 'ADD_RESERVE_SUCCESS',
         trip
    }   
}

export function delReserve(id){
    return{
        type: 'DEL_RESERVE',
        id
    }
}