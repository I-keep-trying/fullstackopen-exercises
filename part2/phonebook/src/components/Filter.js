import React from 'react'

const Filter = ({ searchTerm, handleSearchInput }) => {
  return (
    <>
      Filter by name:
      <input
        value={searchTerm}
        onChange={handleSearchInput}
        placeholder="search..."
      />
    </>
  )
}

export default Filter
