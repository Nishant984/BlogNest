import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import HomePage from './routes/Homepage.jsx'
import PostListPage from './routes/PostListPage.jsx'
import Write from './routes/Write.jsx'
import About from './routes/About.jsx'
import LoginPage from './routes/LoginPage.jsx'
import RegisterPage from './routes/RegisterPage.jsx'
import SinglePostPage from './routes/SinglePostPage.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProfilePage from './routes/UserProfilePage.jsx'
import PublicProfilePage from './routes/PublicProfilePage.jsx'
import NotFound from './routes/NotFound.jsx'

const queryClient = new QueryClient()

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}


const router = createBrowserRouter([
  {
    element:<MainLayout/>,
    children:[
      {
        path: "/",
        element: <HomePage/>,
      },
      {
        path: "/posts",
        element: <PostListPage/>,
      },
      {
        path: "/:slug",
        element: <SinglePostPage/>,
      },
      {
        path: "/write",
        element: <Write/>,
      },
      {
        path: "/login",
        element: <LoginPage/>,
      },
      {
        path: "/register",
        element: <RegisterPage/>,
      },
      {
        path: "/about",
        element: <About/>,
      },
      {
        path: "/profile",
        element: <UserProfilePage/>,
      },
      {
        path: "/id/:username",
        element: <PublicProfilePage/>,
      },
      {
        path: "/not-found",
        element: <NotFound />,
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer position='bottom-right'/>
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>
)
