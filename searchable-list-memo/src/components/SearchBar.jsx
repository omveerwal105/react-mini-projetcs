import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ListItem from './ListItem';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [debounced , setDebounced] = useState('');

  useEffect(()=>{
    const timer = setTimeout(()=>{
        setDebounced(searchTerm);
    },300)

    return () =>{
        clearTimeout(timer);
    }
  },[searchTerm]);

  const items = useMemo(
    () =>
      Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
      })),
    []
  );

  const filtered = useMemo(() => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(debounced.toLowerCase())
    );
  }, [debounced, items]);

  const handleChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <div className="container p-4 mt-1 bg-dark text-light">
      <input
        className="form-control w-50 mx-auto"
        placeholder="Search the item ..."
        value={searchTerm}
        onChange={handleChange}
      />

      {filtered.map((item) => (
        <ListItem key={item.id} name={item.name} />
      ))}

      {filtered.length === 0 && (
        <p className="text-center mt-3">No results found</p>
      )}
    </div>
  );
};

export default SearchBar;
