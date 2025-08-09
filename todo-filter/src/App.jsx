import React from 'react'
import Task from './Task'
import { TaskProvider } from './TaskContext'
import TaskList from './TaskList'
import Filter from './Filter'

const App = () => {
  return (
    <div>
      <TaskProvider>
      <Task />
      <TaskList />
      <Filter />
      </TaskProvider>
    </div>
  )
}

export default App