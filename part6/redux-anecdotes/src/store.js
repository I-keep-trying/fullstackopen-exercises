import { createStore } from 'redux'
import reducer from './reducers/anecdoteReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(reducer, composeWithDevTools())
store.subscribe(() => {
  const storeNow = store.getState()
  console.log('storeNow', storeNow)
})

export default store
