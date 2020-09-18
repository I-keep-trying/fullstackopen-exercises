import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogsReducer from './reducers/blogsReducer'
import blogReducer from './reducers/blogReducer'
import filterReducer from './reducers/filterReducer'
import authReducer from './reducers/authReducer'
import allUsersReducer from './reducers/allUsersReducer'
import userReducer from './reducers/userReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  blogs: blogsReducer,
  blog: blogReducer,
  filter: filterReducer,
  auth: authReducer,
  users: allUsersReducer,
  user: userReducer,
})

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

store.subscribe(() => {
  const storeNow = store.getState()
  console.log('store.subscribe', storeNow)
})
