import React from 'react'

const UserGroups = ({ companyUsers }) => {
    return (
        <div className='container d-flex flex-column align-items-center jusitfy-content-center  '>
            {Object.entries(companyUsers).map(([company, user]) => (
                <div className='card mb-3 w-75 mt-3' key={company}>
                    <div className='card-header'>
                        <h4>{company}</h4>
                    </div>
                    <ul className='list-group list-group-flush'>
                        {user.map((u) => (
                            <li className='list-group-item' key={u.id}>
                                {u.name} ({u.username}) - {u.email}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default UserGroups