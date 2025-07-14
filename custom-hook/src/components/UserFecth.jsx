import React, { useEffect, useState } from 'react'
import useFetch from './useFetch';

const UserFetch = () => {
     const { data: users, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');

 
  return (
    <div className='container text-center'>
     <h2 className='fw-bold text-primary mb-4'>Fetched Users</h2>


       {loading && <p>Loading...</p>}
      {error && <p>Error fetching data: {error.message}</p>}

      {users && (
        <div className='container'>
          {users.map((user, id) => (
            <div className='card mb-3' key={id}>
              <h1 className='card-title'>{user.name}</h1>
              <div className='card-body'>
                <p className='fw-bold'>Username: {user.username}</p>
                <p className='fw-bold'>Email: {user.email}</p>
                <p className='fw-bold'>
                  Address: {user.address.city}, {user.address.street}
                </p>
              </div>
            </div>
          ))}
  

            </div>

        )}

    </div>
  )
}

export default UserFetch