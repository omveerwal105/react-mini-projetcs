import React, { useEffect, useState } from 'react'

const UseFetch = (url) => {
    const [loading , setLoading] = useState(false);
    const [error ,setError] = useState(null);
    const [data , setData] = useState([]);

    useEffect(()=>{
        let isMounted = true;
        setLoading(true);

       const fetchedUsers = async () => {
            try {
                const res = await fetch(url);
                if(isMounted){
                 const   json = await res.json();
                    setData(json);
                }
            }
            catch (err){
                if(isMounted){
                    console.log('Error while fetching' , err);
                    setError(err.message);
                }
            }
            finally{
                if(isMounted){
                    setLoading(false);
                }
            }
        };
        fetchedUsers();

        return  () =>{
            isMounted = false;
        }

    },[url]);

  return {loading , error , data} ;
}

export default UseFetch