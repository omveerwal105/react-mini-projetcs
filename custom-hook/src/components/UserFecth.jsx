import React, { useEffect, useState } from 'react';
import useFetch from './useFetch';
import useDebounce from './useDebounce';

const UserFetch = () => {
    const { data: users, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const userPerPage = 3;



    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const filteredUsers = users?.filter((user) => {
        const term = debouncedSearchTerm.toLowerCase();
        return (
            user.name.toLowerCase().includes(term) ||
            user.username.toLowerCase().includes(term)
        );
    })|| [];

    const totalPages = Math.ceil(filteredUsers.length / userPerPage);
    const startIndex = (currentPage - 1) * userPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + userPerPage);

    useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

    return (
        <div className='container text-center'>
            <h2 className='fw-bold text-primary mb-4'>Fetched Users (Debounced Search)</h2>

            <input
                type='text'
                className='form-control mb-4'
                placeholder='Search by UserName or Name..'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {loading && <p>Loading...</p>}
            {error && <p>Error fetching data: {error.message}</p>}

            {paginatedUsers.length > 0 ? (
                <div className='container'>
                    {paginatedUsers.map((user, id) => (
                        <div className='card mb-3' key={user.id}>
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
            ) : (
                !loading && <p className='text-danger'>No matching users found</p>
            )}
            {/* Pagination Controls */}
            {!loading && filteredUsers.length > 0 && (
                <div className='d-flex justify-content-center mt-4 gap-3'>
                    <button
                        className='btn btn-outline-primary'
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                    >
                        ⬅ Prev
                    </button>
                    <span className='fw-bold'>Page {currentPage} of {totalPages}</span>
                    <button
                        className='btn btn-outline-primary'
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                        Next ➡
                    </button>
                </div>
            )}


        </div>
    );
};

export default UserFetch;
