import notificationReducer from './notificationReducer'
import deepFreeze from 'deep-freeze'

describe('timeout test', () => {
    test('notifications timeout exact time specified', () => {
        const state = {
            content: "If it hurts, do it more often",
            votes: 7,
            id: 1
          }

          const action = {
            type: 'ADD_VOTE',
            data: changeAnecdote,
          }

          deepFreeze(state)
    const newState = notificationReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.data)

    })

})