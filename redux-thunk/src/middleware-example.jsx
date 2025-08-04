const initialState = {
    count : 0
};

function counterReducer(state = initialState , action){
    switch(action.type){
        case 'INCREMENT' :
            return {
                count : state.count+1
            }
        case 'DECREMENT' :
            return {
                count : state.count -1
            }
        default :
        return state ;
    }
}

const logger = store => next => action => {
    console.log('Dispatching', action);
    const result = next(action);
    console.log("Next State:" , store.getState());
    return result ;
};