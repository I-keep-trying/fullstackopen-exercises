import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = props => {

  const handleChange = e => {
    e.preventDefault()
    props.setFilter(e.target.value)
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

export default connect(null, { setFilter })(Filter)
