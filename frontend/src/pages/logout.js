import { redirect } from 'react-router-dom'

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('exp')
  return redirect('/')
}
