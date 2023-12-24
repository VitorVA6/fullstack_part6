import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async event => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''

    dispatch(addAnecdote({ content, votes: 0 }))

    dispatch(setNotification(`you added '${content}'`))
    setTimeout(() => dispatch(setNotification('')), 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={ handleSubmit }>
        <div><input name='content'/></div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm