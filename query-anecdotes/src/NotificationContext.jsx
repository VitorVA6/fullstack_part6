import { createContext, useContext, useReducer } from "react"

const notificationReducer = (state, action) => {
  switch(action.type){
    case 'SET_MESSAGE':
      return action.payload
    case 'CLEAN_MESSAGE':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const NotificationAndValue = useContext(NotificationContext)
  return NotificationAndValue[0]
}

export const useNotificationDispatch = () => {
  const NotificationAndValue = useContext(NotificationContext)
  return NotificationAndValue[1]
}

export default NotificationContext