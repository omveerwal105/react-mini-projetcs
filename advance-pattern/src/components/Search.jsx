import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import useDebouncedSearch from '../customHooks/useDebouncedSearch';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [debounced] = useDebouncedSearch(searchTerm, 500);

  const cache = useRef(new Map());

  useEffect(() => {
    const fetchItems = async () => {
      if (!debounced) return; 

      if (cache.current.has(debounced)) {
        setItems(cache.current.get(debounced));
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`https://dummyjson.com/products/search?q=${debounced}`);
        const data = await res.json();
        setItems(data.products || []);
        cache.current.set(debounced, data.products || []);
      } catch (err) {
        setError(err.message || 'Error while fetching');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [debounced]); 

  const handleChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const results = useMemo(() => items, [items]); 

  return (
    <div className="container p-4 mt-2">
      <input
        className="form-control w-50 mx-auto"
        placeholder="search the item"
        value={searchTerm}
        onChange={handleChange}
      />

      {loading && <div className="spinner-border text-primary"></div>}

      {error && <p>{error} || error while Fetching</p>}

      {!loading &&
        !error &&
        results.map((item) => (
          <div className="card shadow-sm mt-3 w-75 mx-auto" key={item.id}>
            <div className="card-header">
              <h4 className="card-title">{item.title}</h4>
            </div>
            <div className="card-body">
              <p>{item.description}</p>
              <p>
                <strong>Price: </strong>
                {item.price}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Search;
