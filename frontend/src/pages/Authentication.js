import { json, redirect } from 'react-router-dom'
import AuthForm from '../components/AuthForm'

function AuthenticationPage() {
  return <AuthForm />
}

export default AuthenticationPage

export const action = async ({ request, params }) => {
  const searchParams = new URL(request.url).searchParams
  const mode = searchParams.get('mode') || 'login'
  const data = await request.formData()

  const authData = { email: data.get('email'), password: data.get('password') }
  const response = await fetch(`http://localhost:8080/${mode}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  })
  if (response.status === 422) {
    return response
  }
  if (!response.ok) {
    throw json({ message: 'error reach our server!!' }, { status: 500 })
  }
  const { token } = await response.json()
  localStorage.setItem('token', token)
  const date = new Date()
  date.setHours(date.getHours() + 1)
  localStorage.setItem('exp', date.toISOString())

  return redirect('/')
}
