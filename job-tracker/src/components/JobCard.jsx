import React, { useState } from 'react'

const JobCard = ({job , onDelete ,onEdit }) => {


    
  return (
    <div className='container d-flex flex-column align-items-center justify-content-center mt-3 p-2'>
        <h1 className='text-center'>{job.title}</h1>
        <p>Company : {job.company}</p>
        <p>Location : {job.location}</p>
        <p className={`fw-bold ${
            job.status === 'Interview' ? 'text-warning' :
            job.status === 'Applied' ? 'text-primary' :
            job.status === 'Offer' ? 'text-success' :
            ''}
        `}>Status : {job.status}</p>
        <button className='btn btn-sm btn-primary'onClick={()=>onEdit(job)}>Edit</button>
        <button className='btn btn-sm btn-danger'onClick={()=>onDelete(job.id)}>Delete</button>

    </div>
  )
}

export default JobCard