import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notifications: notificationReducer,
  filter: filterReducer,
})

const store = createStore(reducer, composeWithDevTools())
store.subscribe(() => {
  const storeNow = store.getState()
  console.log('storeNow', storeNow) 
})

export default store
