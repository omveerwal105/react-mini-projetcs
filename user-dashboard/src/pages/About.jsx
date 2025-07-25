import React from 'react'
import UserGroups from '../components/UserGroups'
import { useContext } from 'react'
import { ThemeContext } from '../components/ThemeContext'
import { UserContext } from '../components/UserContext'

const About = () => {
    const {themeMode , toggleTheme} = useContext(ThemeContext);
    const {users} = useContext(UserContext);

    const groupedUsers = users.reduce((acc,user)=>{
        const company = user.company.name;
        if(!acc[company]){
            acc[company] = [];
        }
        acc[company].push(user);

        return acc;
    },{});
    return (
        <div className={`container mt-3 p-4 d-flex flex-column align-items-center justify-content-center
     ${themeMode === 'light' ? 'bg-dark text-white' : 'bg-white text-dark'}`}>
            <h2 className='text-center'>Company's User-Info</h2>
            <button className='btn btn-primary' onClick={toggleTheme} >Change to {themeMode === 'light' ? 'lightMode' : 'darkMode'}</button>
            <UserGroups companyUsers={groupedUsers}/>
        </div>
    )
}

export default About