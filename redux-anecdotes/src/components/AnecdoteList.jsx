import { useDispatch, useSelector } from 'react-redux'
import { initializeAnecdotes, updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'

const AnecdoteList = () => {
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])

  const anecdotes = useSelector(
    ({ anecdotes, filter }) => anecdotes.filter( anec => anec.content.includes(filter)).sort((a, b) => b.votes - a.votes)
  )
  const dispatch = useDispatch()

  const vote = anecdote => {
    dispatch(updateAnecdote(anecdote.id, { ...anecdote, votes: anecdote.votes+1 }))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList