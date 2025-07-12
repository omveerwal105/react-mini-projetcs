import React from 'react'
import { useParams } from 'react-router-dom'

const User = () => {
    const {userId} = useParams();
  return (
    <div>
        <h2>User Page</h2>
        <p>Showing details to the user : {userId}</p>
    </div>
  )
}

export default User