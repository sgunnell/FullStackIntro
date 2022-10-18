import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdoteReducer', () => {
  test('returns new state with action NEW_anecdote', () => {
    const state = []
    const action = {
      type: 'anecdotes/createAnecdote',
      payload: {}
    }

    deepFreeze(state)
    expect(state).toHaveLength(0)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(1)
    //expect(newState).toContainEqual(action.data)
    expect(newState.map(s => s.content)).toContainEqual(action.payload)
  })

  test('returns new state with action VOTE', () => {
    const state = [
      {
        content: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        id:1,
        votes: NaN

      }]
      const action = {
        type: 'anecdotes/voteAnecdote',
        payload: 1
      }
    
  
    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
  
    expect(newState).toHaveLength(1)
  
    expect(newState).toContainEqual(state[0])
  
    
  })
})