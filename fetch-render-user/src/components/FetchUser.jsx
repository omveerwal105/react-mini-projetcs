import React, { useEffect, useState } from 'react';
import useFetch from './customHook/useFetch';

const FetchUser = () => {

    const {loading , error , data : users} = useFetch('https://jsonplaceholder.typicode.com/users');

    return (
        <div className='container d-flex flex-column align-items-center justify-content-center p-4'>
            <h2 className='fw-bold text-center mt-2'>Fetched Users</h2>

            {loading && (
                <div className='d-flex justify-content-center'>
                    <div className='spinner-border text-primary' role='status'>
                        <span className='visually-hidden'>Loading...</span>
                    </div>
                </div>
            )}

            {!loading && error && (
                <p className='alert alert-danger'>Error while fetching the data</p>
            )}

            {!loading && users.length > 0 && (
                <div className='w-75 mx-auto'>
                    {users.map((user) => (
                        <div className='card mb-3' key={user.id}>
                            <div className='card-header text-center'>
                                <h5>{user.name}</h5>
                                <small>{user.username}</small>
                            </div>
                            <div className='card-body'>
                                <p className='fw-bold'>{user.email}</p>
                                <p>
                                    {user.address.street}, {user.address.city}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FetchUser;
