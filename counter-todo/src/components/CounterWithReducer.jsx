import React, { useReducer } from 'react'


const initialState = {count : 0};

const reducer = (state , action) => {
    switch (action.type){
        case 'Increment':
            return {count : state.count + 1};
        
        case 'Decrement' :
            return {count : state.count - 1};
        
        case "Reset" :
            return {count : 0}
         
        default :
        return state ;
    }
}
const CounterWithReducer = () => {
    const [state , dispatch] = useReducer(reducer , initialState);

    const handleIncrement = () => {
        dispatch({
            type : 'Increment'  
        })
    }
    const handleDecrement = () => {
        dispatch ({
            type : 'Decrement'
        })
    }

    const handleReset = () => {
        dispatch({
            type : 'Reset'
        })
    }
  return (
    <div>
        <h2>Counter : {state.count}</h2>
        <button onClick={handleIncrement}>++</button>
        <button onClick={handleDecrement}>--</button>
        <button onClick={handleReset}>Reset</button>
    </div>
  )
}

export default CounterWithReducer