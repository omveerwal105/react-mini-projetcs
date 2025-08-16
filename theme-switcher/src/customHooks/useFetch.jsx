import { useEffect, useState } from 'react';

const useFetch = (api) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        let response = await fetch(api, { signal: controller.signal });
        let result = await response.json();
        setData(result.users || []);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    return () => controller.abort();
  }, [api]);

  return [loading, error, data];
};

export default useFetch;
