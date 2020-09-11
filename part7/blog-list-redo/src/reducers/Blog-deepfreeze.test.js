import blogReducer from './blogReducer'
import deepFreeze from 'deep-freeze'

describe('blogReducer', () => {
  test('returns new state with action NEW_BLOG', () => {
    const state = []
    const action = {
      type: 'NEW_BLOG',
      data: {
        title: 'the app state is in redux store',
        author: 'truename',
        url: 'example.com',
        likes: 0,
        id: 1,
      },
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.data)
  })
  test('returns new state with action DELETE', () => {
    const state = [
      {
        title: 'the app state is in redux store',
        author: 'truename',
        url: 'example.com',
        likes: 0,
        id: 1,
      },
      {
        title: 'another blog would go here',
        author: 'truename',
        url: 'example.com',
        likes: 0,
        id: 2,
      },
    ]
    const action = {
      type: 'DELETE_BLOG',
      data: {
        title: 'the app state is in redux store',
        author: 'truename',
        url: 'example.com',
        likes: 0,
        id: 1,
      },
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.data)
  })
})
