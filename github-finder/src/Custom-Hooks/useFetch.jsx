import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!url) return;

    let isMounted = true;

    const fetchData = async () => {
        setData(null);
      setLoading(true);
      setNotFound(false);


      try {
        const res = await fetch(url);
        if (res.status === 404) {
          if (isMounted) setNotFound(true);
          return;
        }

        const json = await res.json();
        if (isMounted) {
          setData(json);
        }
      } catch (err) {
        if (isMounted) {
          console.log('Error:', err);
          setNotFound(true);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, notFound };
};

export default useFetch;
