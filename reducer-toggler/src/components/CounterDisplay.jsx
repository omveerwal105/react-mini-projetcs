import React from 'react'
import { useContext } from 'react'
import { CounterContext } from '../context/CounterContext'

const CounterDisplay = () => {
    const {counterState} = useContext(CounterContext);
  return (
    <div className='container d-flex justify-content-center'>
        <h2>Counter : {counterState.count}</h2>

    </div>
  )
}

export default CounterDisplay