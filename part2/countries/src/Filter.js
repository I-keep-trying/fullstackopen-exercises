import React from 'react'

const Filter = ({ searchTerm, handleSearchInput }) => {
  return (
    <>
      find countries:{' '}
      <input
        value={searchTerm}
        onChange={handleSearchInput}
        placeholder="search..."
      />
    </>
  )
}

export default Filter

//Åland Islands
