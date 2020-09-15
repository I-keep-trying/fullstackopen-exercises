import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import filterReducer from './reducers/filterReducer'
import userReducer from './reducers/userReducer'
import allUsersReducer from './reducers/allUsersReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  blogs: blogReducer,
  filter: filterReducer,
  user: userReducer,
  users: allUsersReducer,
})

export const store = createStore(
    reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

store.subscribe(() => {
  const storeNow = store.getState()
  console.log('store.subscribe', storeNow)
})

