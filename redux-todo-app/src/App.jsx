import React from 'react'
import TodoList from './features/todos/TodoList'
import ModalComponent from './features/modal/ModalComponent'
import { useDispatch } from 'react-redux'
import { toggleModal } from './features/modal/modalSlice'


const App = () => {
  const dispatch = useDispatch();
  return (
    <div>

      <ModalComponent />

      <button className='btn btn-warning m-3'onClick={()=>dispatch(toggleModal())}>Toggle Modal</button>
      
      <TodoList />

    </div>
  )
}

export default App