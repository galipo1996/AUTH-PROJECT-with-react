import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import EditEventPage from './pages/EditEvent'
import ErrorPage from './pages/Error'
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from './pages/EventDetail'
import EventsPage, { loader as eventsLoader } from './pages/Events'
import EventsRootLayout from './pages/EventsRoot'
import HomePage from './pages/Home'
import NewEventPage from './pages/NewEvent'
import RootLayout from './pages/Root'
import { action as manipulateEventAction } from './components/EventForm'
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter'
import AuthenticationPage, {
  action as ActionAuthSignup,
} from './pages/Authentication'
import { logout as ActionLogout } from './pages/logout'
import { AuthLoader, checkAuth } from './util/index'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    id: 'auth',
    loader: AuthLoader,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ':eventId',
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: 'edit',
                element: <EditEventPage />,
                loader: checkAuth,
                action: manipulateEventAction,
              },
            ],
          },
          {
            path: 'new',
            element: <NewEventPage />,
            loader: checkAuth,
            action: manipulateEventAction,
          },
        ],
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: 'auth',
        element: <AuthenticationPage />,
        action: ActionAuthSignup,
      },
      {
        path: 'logout',
        action: ActionLogout,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
