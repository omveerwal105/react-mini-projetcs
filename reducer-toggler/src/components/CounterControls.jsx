import React, { useContext } from 'react'
import { CounterContext } from '../context/CounterContext'

const CounterControls = () => {
    const { dispatchCounter} = useContext(CounterContext);

    const handleIncrement  = () => {
        dispatchCounter({
            type : 'INCRE_',
        })
    }
    const handleDecrement = () => {
        dispatchCounter({
            type : 'DECRE_',
        })
    }
    const handleReset = () => {
        dispatchCounter({
            type : 'RESET'
        })
    }

  return (
    <div className='container '>
        <button className='btn btn-success'  onClick={handleIncrement}>➕</button>
        <button className='btn btn-danger' onClick={handleDecrement}>➖</button>
        <button className='btn btn-primary' onClick={handleReset}>🔄</button>
    </div>
  )
}

export default CounterControls