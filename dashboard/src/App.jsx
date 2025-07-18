import React from 'react'
import MiniFitnessDashboard from './component/MiniFitnessDashboard';

const App = () => {
  const Name = 'Om';
  const Greet = 'Welcome'
  return (
    <div className='container py-4 d-flex justify-content-center'>

      <MiniFitnessDashboard name = {Name} greet = {Greet} />
    </div>
  )
}

export default App