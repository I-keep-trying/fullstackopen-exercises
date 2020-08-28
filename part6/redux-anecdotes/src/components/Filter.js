import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = e => {
    e.preventDefault()
    dispatch(setFilter(e.target.value))
  } 
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      <form>
        filter <input onChange={handleChange} name="filter" />
      </form>
    </div>
  )
}

export default Filter
