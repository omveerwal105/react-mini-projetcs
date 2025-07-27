import React from 'react'
import UseFetch from './CustomHooks/UseFetch'
import UserCard from './components/UserCard';

const App = () => {
  const {loading , error , data : users} = UseFetch('https://jsonplaceholder.typicode.com/users');
  return (
    <div className='container d-flex flex-column justify-content-center align-items-center py-4'>
      <h2 className='text-center'>Users Info</h2>

      {loading && <div className='d-flex justify-content-center container'>
        <div className='spinner-border text-primary'role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
        </div>}

        {error && <p className='alert alert-danger'>{error} || Something Went Wrong</p>}

        <div className='row g-3'>
        {!loading && !error && users.map((user)=>(
          <div className='col-md-4 col-12 'key={user.id}>
          <UserCard  user = {user} /> 
          </div>
        ))}
    </div>
    </div>
  )
}

export default App