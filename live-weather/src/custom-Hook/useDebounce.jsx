import React, { useEffect, useState } from 'react'

const useDebounce = (value , delay) => {
    const [debouncedValue ,setDebouncedvalue] = useState('');
    
    useEffect(()=>{
        const timerId = setTimeout(()=>{
            setDebouncedvalue(value);
        },delay);

        return  () =>{
            clearTimeout(timerId);
        }
    },[value , delay]);
    
  return debouncedValue;
}

export default useDebounce