import React from 'react'
import ExpenseItem from './ExpenseItem'
import { MdDelete } from 'react-icons/md'
import "./ExpenseList.css"

const ExpenseList = ({expenses, handleDelete, handleEdit, clearItems}) => {
  // console.log(initialExpenses)
  return (
    <div>
      <React.Fragment>
        <>
          <ul className='list'>
              {/* ExpenseItem */}
              {expenses.map(expense => {
                return (
                  <ExpenseItem 
                    expense={expense}
                    key={expense.id}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                  ></ExpenseItem>
                )
              })}
          </ul>
          {expenses.length > 0 && (
            <button className='btn' onClick={() => {clearItems()}}>
              목록 지우기
              <MdDelete className='btn-icon'/>
          </button>
          )}
        </>
      </React.Fragment>
      {/* <>
      
      </> */}
    </div>
  )
}

export default ExpenseList