import React from 'react'
import useToggle from '../CustomHooks/useToggle'

const UserCard = ({ user }) => {
    const { show, toggler } = useToggle(false);
    return (

        <div className='card mx-auto mt-3'>
            <div className='card-header'>
                <div className='card-title'>
                    <h2>{user.name}</h2>
                </div>
                <small>{user.username}</small>
            </div>
            <div className='card-body'>
                <p>{user.email}</p>
                <p><strong>Phone :</strong>{user.phone}</p>
                <button className='btn btn-primary ' onClick={toggler}>
                    {show ? 'Hide Content' : 'Show Content'}
                </button>
                {show && (
                    <div className='alert alert-info mt-3'>
                        <p><strong>Website:</strong> {user.website}</p>
                        <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
                        <p><strong>Company:</strong> {user.company.name}</p>
                    </div>
                )}
            </div>

        </div>

    )
}

export default UserCard