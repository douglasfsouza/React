import produce from 'immer';
export default function reserve(state = [], action){
    
    switch(action.type){
        case 'DEL_RESERVE':
            return produce(
                state,
                draft => {
                    const index = draft.findIndex(f => f.id === action.id);
                    if (index > -1){                        
                        if (draft[index].amount > 1){
                            draft[index].amount -= 1;
                        }
                        else{
                            draft.splice(index,1);
                        }
                    }
                }
            )

        case 'ADD_RESERVE_SUCCESS':
            return produce(state, draft => {
                const tripIndex = draft.findIndex(trip => trip.id === action.trip.id);
        
                if(tripIndex >= 0){
                  draft[tripIndex].amount +=1;
                  
                }else{
                  draft.push({
                    ...action.trip,
                    amount:1,
                  });
                }
        
              });
        default:
            return state;
    }
    
}
