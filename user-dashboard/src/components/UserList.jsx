import React from 'react'
import { useState } from 'react'
import UserCard from './UserCard';
import { useEffect } from 'react';
import UserGroups from './UserGroups';
import { useContext } from 'react';
import { UserContext } from './UserContext';

const UserList = () => {
    const {loading , error , users} = useContext(UserContext);
    const [searchUser,setSearchUser] = useState('');


    const filtered = users.filter((user)=>{
        const search = searchUser.toLowerCase();
        return (
            user.name.toLowerCase().includes(search) ||
            user.username.toLowerCase().includes(search)
        );
    })
    const handleChange = (e) => {
        setSearchUser(e.target.value);
    }

    const groupedUsers = filtered.reduce((acc,user)=>{
        const company = user.company.name;
        if(!acc[company]){
            acc[company] = [];
        }
        acc[company].push(user);

        return acc;
    },{});

    return (
        <div className='container d-flex flex-column mt-3'>

             <UserCard onChange={handleChange} onSearch = {searchUser } onError = {error} onLoad = {loading} users = {filtered}  />
        
      
        </div>
    )
}

export default UserList