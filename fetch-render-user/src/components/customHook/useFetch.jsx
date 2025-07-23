import React, { useEffect, useState } from 'react'

const useFetch = (url) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            if (isMounted) setLoading(true);
            try {
                const res = await fetch(url);
                const json = await res.json();
                if (isMounted) {
                    setData(json);
                }
            }
            catch (err) {
                if (isMounted) {
                    console.log('error while fetching', err);
                    setError(err);
                }
            }
            finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };
        fetchData();
        return () => {
            isMounted = false;
        }
    },[url]);
    return {data , loading , error};
}

export default useFetch