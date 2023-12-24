import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const newAnecMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notificationDispatch({
        type: 'SET_MESSAGE',
        payload: `you created '${response.content}'`
      })
      setTimeout(() => {
        notificationDispatch({
          type: 'CLEAN_MESSAGE'
        })
      }, 5000)
    },
    onError: (err) => {
      notificationDispatch({
        type: 'SET_MESSAGE',
        payload: `${err.response.data.error}`
      })
      setTimeout(() => {
        notificationDispatch({
          type: 'CLEAN_MESSAGE'
        })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
