import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import blogsReducer from './reducers/blogsReducer'
import filterReducer from './reducers/filterReducer'
import userReducer from './reducers/userReducer'
import allUsersReducer from './reducers/allUsersReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'

const reducer = combineReducers({
  blogs: blogsReducer,
  blog: blogReducer,
  filter: filterReducer,
  user: userReducer,
  users: allUsersReducer,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
)
export const persistor = persistStore(store)

store.subscribe(() => {
  const storeNow = store.getState()
  console.log('store.subscribe', storeNow)
})
