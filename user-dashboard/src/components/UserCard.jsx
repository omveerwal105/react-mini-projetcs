import React from 'react'

const UserCard = ({onChange , onSearch , onError , onLoad , users}) => {
  return (
    <div className='flex-1 mt-3'>
        <input 
        className='form-control mb-2'
        placeholder='Search the name or username...'
        value={onSearch}
        onChange={onChange}
        />
               
            {onLoad && <div className='container d-flex justify-content-center'>

                <div className='spinner-border text-primary' role='status'>
                    <span className='visually-hidden'>loading...</span>
                </div>
                </div>}

                {onError && <p className='alert alert-danger'>{onError} || SomeThing Went Wrong</p>}

                {!onLoad && !onError && users.map((user)=>(
                    <div className='card mx-auto mt-2' key={user.id}>
                        <div className='card-header mt-2'>
                            <div className='card-title'>
                                <h4>{user.name}</h4>
                            </div>
                            <small>{user.username}</small>
                        </div>
                        <div className='card-body mt-2'>
                            <p>{user.email}</p>
                        </div>
                    </div>
                ))}
    </div>
  )
}

export default UserCard