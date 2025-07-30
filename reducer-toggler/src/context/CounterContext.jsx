import { createContext, useReducer } from "react";

export const CounterContext = createContext();

const reducerCounter = (counterState , action) => {
    switch(action.type) {
        case 'INCRE_':
            return {
                count : counterState.count + 1
            }
        case 'DECRE_':
            return {
                count : counterState.count - 1
            }
        case 'RESET':
            return {
                count : 0
            }
        default :
        return counterState;
    }
}

export const CounterProvider = ({children}) => {

    const [counterState,dispatchCounter] = useReducer(reducerCounter , {count : 0});
    return (
      <CounterContext.Provider value={{counterState , dispatchCounter}}>
        {children}
      </CounterContext.Provider>
    );
}