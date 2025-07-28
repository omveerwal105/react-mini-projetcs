import React, { useMemo, useState } from 'react';

const ExpensiveComponent = () => {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);

  const double = useMemo(() => {
    console.log("Calculating...");
    let result;
    for (let i = 0; i < 1e9; i++) {
      result = number * 2;
    }
    return result;
  }, [number]);

  const themeStyles = {
    backgroundColor: dark ? '#333' : '#FFF',
    color: dark ? '#FFF' : '#000',
    padding: '1rem',
    marginTop: '1rem'
  };

  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value) || 0)}
      />
      <button onClick={() => setDark((prev) => !prev)}>Toggle Theme</button>
      <div style={themeStyles}>Double: {double}</div>
    </div>
  );
};

export default ExpensiveComponent;
