import React, { useEffect, useState } from 'react'

const useFetch = (url) => {
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        let isMounted = true;

        const fetchData = async () => {
            try {
            const res = await fetch(url);
            const json = await res.json();

            if(isMounted){
                setData(json);
                setLoading(false);
            }
        }
        catch (err){
            if(isMounted){
                setError(err);
                setLoading(false);
            }
        }
    };
    fetchData();
     return () => {
         isMounted = false;
     };


    },[url]);
  return {data , loading ,error};
};

export default useFetch