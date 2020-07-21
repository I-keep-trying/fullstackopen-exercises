import React from 'react'

const Filter = ({searchTerm, handleSearchInput}) => {
    return (
        <>
          filter shown with{' '}
      <input
        value={searchTerm}
        onChange={handleSearchInput}
        placeholder="search..."
      />
        </>
    )
}

export default Filter