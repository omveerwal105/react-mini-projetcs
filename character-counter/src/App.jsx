import React, { useState } from 'react'
import CharacterCounter from './component/CharacterCounter'

const App = () => {
  
  return (
    <div>
      <h2>Count the characters</h2>
      <CharacterCounter maxLength = {100} />
    </div>
  )
}

export default App