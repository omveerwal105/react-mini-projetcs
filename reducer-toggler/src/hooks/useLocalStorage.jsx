import React, { useEffect, useState } from 'react'

const useLocalStorage = (key , initialValue) => {

    const getInitial = () => {
        const saved = localStorage.getItem(key);
        return saved !== null ? JSON.parse(saved) : initialValue;
    } ;

    const [value , setValue] = useState(getInitial);

    useEffect(()=>{
        localStorage.setItem(key , JSON.stringify(value))
    
    },[key , value])
  return [value , setValue] ;
}

export default useLocalStorage