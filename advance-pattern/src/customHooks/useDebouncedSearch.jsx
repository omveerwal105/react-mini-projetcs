import React, { useEffect, useState } from 'react'

const useDebouncedSearch = (value , delay) => {
    const [debouncedTerm ,setDebouncedTerm] = useState('');
    useEffect(()=>{
        let timer = setTimeout(()=>{
            setDebouncedTerm(value);
        },delay);
        return () => {
            clearTimeout(timer);
        }
    },[value , delay]);
  return [debouncedTerm];
}

export default useDebouncedSearch