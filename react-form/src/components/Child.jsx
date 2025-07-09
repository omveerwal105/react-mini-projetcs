import React from 'react';

const Child = ({ count , Increment }) => {

  return (
    <div>
        <h2>Current Count {count}</h2>
        <button onClick={Increment}>Increase</button>
    </div>
  );
};

export default Child;
