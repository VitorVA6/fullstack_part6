import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAll, updateAnecdote } from './requests'
import { useContext } from 'react'
import NotificationContext, { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const notificationDispatch = useNotificationDispatch()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    refetchOnWindowFocus: false
  })

  const queryClient = useQueryClient()
  const updateAnecMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  if(result.isLoading){
    return <div>loading data...</div>
  }

  if(result.isError){
    return <span>Anecdote service is not available due problems in server</span>
  }

  const handleVote = (anecdote) => {
    updateAnecMutation.mutate({ ...anecdote, votes: anecdote.votes+1 })
    notificationDispatch({
      type: 'SET_MESSAGE',
      payload: `you voted '${anecdote.content}'`
    })
    setTimeout(() => {
      notificationDispatch({
        type: 'CLEAN_MESSAGE'
      })
    }, 5000)
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
