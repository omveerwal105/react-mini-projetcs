import React, { useEffect, useRef, useState } from 'react'

const Stopwatch = () => {
    const [time , setTime] = useState(0);
    const intervalRef = useRef(null);

    const startTimer = () => {
        if(intervalRef.current !== null) return;

        intervalRef.current = setInterval(()=>{
            setTime((prev)=>prev+1)
        },1000);
    }

    const stopTimer = () =>{
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }
    
  return (

    <div className='container '>
        <h2>Stopwatch : {time}</h2>
    <button onClick={startTimer}>Start</button>
    <button onClick={stopTimer}>Stop</button>
    </div>
  )
}

export default Stopwatch