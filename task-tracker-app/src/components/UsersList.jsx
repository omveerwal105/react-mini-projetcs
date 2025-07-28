import React, { useCallback, useState, useMemo } from 'react'

const UsersList = () => {
   const usersData = useMemo(() => ([
  { id: 1, name: 'John Doe', role: 'Admin' },
  { id: 2, name: 'Alice Smith', role: 'User' },
  { id: 3, name: 'Bob Johnson', role: 'Admin' },
  { id: 4, name: 'Emily Davis', role: 'User' },
  { id: 5, name: 'Chris Lee', role: 'Manager' },
]), []);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('');


    const searchArray = useMemo(() => {
        const search = searchTerm.toLowerCase();

        return usersData.filter((user) => {
            return (
                user.name.toLowerCase().includes(search) &&
                (selectedRole === '' || user.role === selectedRole)
            );
        })
    }, [searchTerm, selectedRole]);




    return (
        <div className='container d-flex flex-column justify-content-center align-items-center'>
            <input
                className='form-control'
                placeholder='search'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} />


            <select
                className='form-select mb-3'
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
            >
                <option value=''>All Roles</option>
                <option value='Admin'>Admin</option>
                <option value='User'>User</option>
                <option value='Manager'>Manager</option>
            </select>



            {searchArray.length === 0 ? (
                <p className='text-muted'>No matching users found.</p>
            ) : (
                searchArray.map((user) => (
                    <div className='card mt-2 w-100' key={user.id}>
                        <div className='card-body'>
                            <h5 className='card-title'>{user.name}</h5>
                            <p className='card-text fw-bold'>{user.role}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default UsersList