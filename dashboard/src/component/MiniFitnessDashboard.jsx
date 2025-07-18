import React, { useState } from 'react'
// import { dummy } from './data';

const MiniFitnessDashboard = ({name , greet}) => {
    const [goals,setGoals] = useState([]);

    const handleChange = () =>{
        const dummy = {
    id: Date.now(),
    title: "Lose 5kg",
    type: "Weight Loss"
  };
        setGoals([...goals,dummy]);
    }



  return (
    <div className='container text-center'>
        <h1 className='text-primary'>Mini Fitness Dashboard</h1>
        <h2 className='text-primary'>{greet}</h2>
        <h4 className='text-success'>{name}</h4>
        <button className='btn btn-primary mb-3' onClick={handleChange}>Show Goal</button>

        {goals.length===0 ? (
             <p>No goals added yet. Start your journey!</p>

        ) : (

               goals.map((goal,id)=>(
            <div key={id} className='card mx-auto mb-2'><h4>{goal.title}</h4>{goal.type}</div>
        ))
            
        )}



     
    </div>
  )
}

export default MiniFitnessDashboard