import React from 'react'
import ExpenseTracker from './components/ExpenseTracker'
import { ExpenseProvider } from './context/ExpenseContext'

const App = () => {
  return (
    <div>
      <ExpenseProvider>
      <ExpenseTracker />
      </ExpenseProvider>
    </div>
  )
}

export default App