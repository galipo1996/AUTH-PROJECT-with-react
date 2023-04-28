import { Outlet, useNavigation, useSubmit } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation'
import { useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import { getTokenDuration } from '../util'

function RootLayout() {
  const navigation = useNavigation()
  const submit = useSubmit()
  const token = useLoaderData()

  useEffect(() => {
    const exp = getTokenDuration()
    if (!token) {
      return
    }
    if (token === 'EXPIRED') {
      submit(null, { action: '/logout', method: 'post' })
      return
    }
    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' })
    }, exp)
  }, [submit, token])
  return (
    <>
      <MainNavigation />
      <main>
        {navigation.state === 'loading' && <p>Loading...</p>}
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout
