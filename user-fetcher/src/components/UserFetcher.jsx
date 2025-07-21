import React, { useEffect, useState } from 'react'

const UserFetcher = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchUser, setSearchUser] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [controller, setController] = useState(null);

    const openModal = (user) => {
        setSelectedUser(user);
    };

    const closeModal = () => {
        setSelectedUser(null);
    }

    const fetchUser = async () => {

        if (controller) {
            controller.abort();
        }

        const newController = new AbortController();
        setController(newController);
        setLoading(true);
        setError(false);
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/users', {
                signal: newController.signal,
            });
            if (!res.ok) {
                throw new Error('Fetch failed');
            }
            const data = await res.json();
            setUsers(data);
        }
        catch (err) {
            if (err.name === 'AbortError') {
                console.log('Fetch aborted');
            } else {
                console.log('Error while fetching ', err);
                setError(true);
            }
        }
        finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };

        if (selectedUser) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden'; 
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto'; 
        };
    }, [selectedUser]);





    useEffect(() => {

        fetchUser();
        return () => {
            if (controller) controller.abort();
        }

    }, []);

    const filteredUsers = users?.filter((user) => {
        const term = searchUser.toLowerCase();
        return (
            user.name.toLowerCase().includes(term) ||
            user.username.toLowerCase().includes(term)
        );
    });

    return (
        <div className='container py-4 d-flex flex-column align-items-center'>
            <h2 className='text-primary fw-bold mb-4'>Fetched Users : {users.length}</h2>


            <button className='btn btn-outline-primary mb-4' onClick={fetchUser}>
                🔁 Refresh Users
            </button>


            <input
                type='text'
                className='form-control mb-3'
                placeholder='Search The Name or UserName...'
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)} />

            {loading &&
                <div className='d-flex justify-content-center'>
                    <div className='spinner-border primary-text ' role='status'>
                        <span className='visually-hidden'>Loading...</span>
                    </div>
                </div>
            }
            {!loading && error && <p className='text-danger fw-bold'>Error fetching users. Please try again.</p>}
            {!loading && filteredUsers.length === 0 ? (<p className='fw-bold'>no User Found</p>) :
                <ul className='list-group cursor-pointer w-100'>
                    {filteredUsers.map((user) => (
                        <li className='list-group-item   list-group-item-action d-flex flex-column align-items-start'
                            key={user.id}
                            onClick={() => openModal(user)}
                        >
                            <h5>
                                {user.name}
                            </h5>
                            <small>{user.username}</small>
                        </li>
                    ))}
                </ul>
            }

            {selectedUser && (
                <div className='modal show fade d-block' tabIndex='-1' role='dialog'>
                    <div className='modal-dialog'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title'>{selectedUser.name}</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className='modal-body'>
                                <p><strong>Username:</strong> {selectedUser.username}</p>
                                <p><strong>Email:</strong> {selectedUser.email}</p>
                                <p><strong>Phone:</strong> {selectedUser.phone}</p>
                                <p><strong>Website:</strong> {selectedUser.website}</p>
                            </div>
                        </div>
                    </div>
                    <div className='modal-backdrop fade show' onClick={closeModal}></div>
                </div>
            )}


        </div>
    )
}

export default UserFetcher