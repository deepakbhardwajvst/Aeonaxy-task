import { useState } from 'react'
import CreateProfile from './components/CreateProfile';
import SignUp from './components/SignUp';
import Reason from './components/Reason';
import VerifyMail from "./components/VerifyMail";
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <SignUp />
    },
    {
      path: '/create-profile',
      element: <CreateProfile />
    },
    {
      path: '/reason',
      element: <Reason />
    },
    {
      path: '/verify-mail',
      element: <VerifyMail />
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
