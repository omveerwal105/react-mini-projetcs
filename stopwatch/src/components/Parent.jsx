import React, { useCallback, useState } from 'react'
import Child from './Child';

const Parent = () => {
    const users = ['om' , 'khushi' , 'shivani' , 'aisha' , 'vijeta'];

    const [searchTerm , setSearchTerm] = useState('');

    const filtered = useCallback(()=>{
        const search = searchTerm.toLowerCase();

        return users.filter((user)=>{
          return user.toLowerCase().includes(search);
        })
    },[searchTerm]);
   

  return (
    <div className='container mt-3  d-flex flex-column justify-content-center'>

        <input 
        type='text'
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
        />

        <Child users = {users} filtered = {filtered} />

    </div>
  )
}

export default Parent