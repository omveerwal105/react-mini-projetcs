import React from 'react'

const Child = React.memo(({ onAdd, filtered , onDelete }) => {

    return (
        <div className='container p-4'>
            <button className='btn btn-primary' onClick={onAdd}>Add</button>
            {filtered.length === 0 ? (
                <p className="text-muted">No matching tasks.</p>
            ) : (
                filtered.map((user, index) => (
                    <div className='card mt-3' key={index}>
                        <div className='text-center card-title'><h4>{user}</h4></div>
                        <button className='btn btn-danger' onClick={()=>onDelete(index)}>Delete</button>
                    </div>
                ))
            )}



        </div>
    )
})


export default Child