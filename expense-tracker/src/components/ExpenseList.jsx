import React from 'react'

const ExpenseList = ({ expense , onDelete , onEdit}) => {
    
  return (
    <div className='card mx-auto'>
        <div className='card-header'>
            <h4 className='card-title'>{expense.name}</h4>
        </div>
        <div className='card-body '>
            <p><strong>Expense: </strong>{expense.amount}</p>
        </div>
        <button className='btn btn-warning'onClick={()=>onEdit(expense.id)}>Edit</button>
        <button className='btn btn-danger' onClick={()=>onDelete(expense.id)}>Delete</button>        
    </div>
  )
}

export default ExpenseList