import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import LandingPage from './components/LandingPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import VerifyEmail from './pages/VerifyEmail.jsx'
import BasicInformation from './pages/BasicInformation.jsx'
import AuthGuard from './components/AuthGuard.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthGuard requireAuth={false}><LandingPage /></AuthGuard>
  },
  {
    path: '/dashboard',
    element: <AuthGuard><Dashboard /></AuthGuard>
  },{
    path : '/signin',
    element : <AuthGuard requireAuth={false}><SignIn/></AuthGuard>
  },
  {
    path : '/signup',
    element : <AuthGuard requireAuth={false}><SignUp/></AuthGuard>
  },
  {
    path:'/verify-email',
    element : <VerifyEmail/>
  },
  {
    path: '/basic-information',
    element: <BasicInformation />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
