import React, { useReducer } from 'react'

const initialSate = {count : 0};
function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 }
        case 'decrement':
            return { count: state.count - 1 }
        case 'reset':
            return initialSate
        default :
        return state
    }
}

const CounterWithReducer = () => {
    const [state, dispatch] = useReducer(reducer, initialSate);
    return (
        <div className='container text-center'>
            <h4>useReducer Counter </h4>
            <p>Count : {state.count}</p>
            <button onClick={()=>dispatch({type: 'increment'})}>++</button>
            <button onClick={()=>dispatch({type : 'decrement'})}>--</button>
            <button onClick={()=>dispatch({type:'reset'})}>Reset</button>
        </div>
    )
}

export default CounterWithReducer