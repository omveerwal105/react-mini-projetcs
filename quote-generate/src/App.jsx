import React from 'react'
import QuoteBox from './components/QuoteBox'

const App = () => {
  return (
    <div className='container text-center'>
         <h1 className='pw-bold text-primary'>Quote Generator App</h1>
         <QuoteBox />
    </div>
  )
}

export default App