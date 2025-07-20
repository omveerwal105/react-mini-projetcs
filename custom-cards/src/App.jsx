import React from 'react'
import Card from './components/Card';

const App = () => {
  const dummy = {
    title :"React Card",
    description :"This is a custom card component built in React.",
    image : "https://via.placeholder.com/300",
  };

return (
  <div className='container py-4'>
    <h2 className='text-center fw-bold'>Custom Cards</h2>

  <Card
  title={dummy.title}
  description={dummy.description}
  image={dummy.image}
  onClick={() => alert("Learn More clicked!")}
/>

  </div>
)
}

export default App