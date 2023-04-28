import { redirect } from 'react-router-dom'

export const getTokenDuration = () => {
  const exp = new Date(localStorage.getItem('exp'))
  const now = new Date()
  const restTime = exp.getTime() - now.getTime()
  return restTime
}

export const getToken = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    return null
  }
  const duration = getTokenDuration()
  if (duration < 0) {
    return 'EXPIRED'
  }

  return token
}

export const AuthLoader = () => {
  return getToken()
}

export const checkAuth = () => {
  const token = getToken()
  if (!token) {
    return redirect('/auth')
  }
}
