import React, { useState } from 'react';
import Child from './Child';

const Parent = () => {
    const greet = "Hello Om";
    const age = "you are 23 years old";

    const [count ,setCount] = useState(0);

    const Increment = () =>{
        setCount((prev)=>prev+1);
    }
  
    return (
      <div>
          <Child count = {count} Increment ={Increment} />
      </div>
    );
};

export default Parent;
