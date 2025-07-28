import React from 'react';

const Child = React.memo(({ users , filtered }) => {
  console.log('Child rendered',users);
   const result = filtered();
  return (
    <div >
      <h3>I am Child</h3>
    {result.map((user,index)=>(
        <div className='card mt-2'key={index} >
        <div className='mt-2 text-center'>
            {user}
        </div>
        </div>
    ))}
    </div>
  );
});

export default Child;
