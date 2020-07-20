import React from 'react'

const PersonForm = ({addPerson, handleNameInput, handleNumberInput, newName, newNumber}) => {

    return (
        <>
         <form onSubmit={addPerson}>
        <div>
          name:{' '}
          <input
            placeholder="add name..."
            value={newName}
            onChange={handleNameInput}
          />
          <br />
          number:{' '}
          <input
            placeholder="add number..."
            value={newNumber}
            onChange={handleNumberInput}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
        </>
    )
}

export default PersonForm