
const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.data]
      case 'INITIALIZE':
        return action.data
    case 'TOGGLE_IMPORTANCE': {
        console.log('toggle action',action.data)
      const id = action.data.id
      const noteToChange = state.find((n) => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      }
      return state.map((note) => (note.id !== id ? note : changedNote))
    }
    default:
      return state
  }
}

export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      id: Date.now(),
    },
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id },
  }
}

export const initializeNotes = (notes) => {
    return {
      type: 'INITIALIZE',
      data: notes,
    }
  }

export default noteReducer
