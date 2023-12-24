import { createSlice } from '@reduxjs/toolkit'
import anecService from '../services/anecdotes'

const anecSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action){
      const anec = action.payload
      return state.map(a => a.id === anec.id ? anec : a
      )
    }
  }
})

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecService.create(anecdote)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const updateAnecdote = (id, data) => {
  return async dispatch => {
    const updatedAnecdote = await anecService.update(id, data)
    dispatch(voteAnecdote(updatedAnecdote))
  }
}

export default anecSlice.reducer