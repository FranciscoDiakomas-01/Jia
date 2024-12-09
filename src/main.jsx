import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.jsx';
import './index.css'
import Main from './pages/Main/index.jsx';
import Users from './pages/Users/index.jsx';
import Posts from './pages/Posts/index.jsx';
import UsersProfile from "./pages/UsersProfile/index";
import PostForm from './components/Postform/index.jsx';
import PostDetails from './components/PostDetails/index.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Acount from './pages/Count/index.jsx';
import Notify from './pages/Notify/index.jsx';
import Login from './pages/Login/index.jsx';
import 'react-toastify/ReactToastify.css'
import SignIn from './pages/Login/signin.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/posts",
        element: <Posts />,
      },

      {
        path: "/userProfile",
        element: <UsersProfile />,
      },
      {
        path: "/createPost",
        element: <PostForm />,
      },
      {
        path: "/postDetails",
        element: <PostDetails />,
      },
      {
        path: "/acount",
        element: <Acount />,
      },
      {
        path: "/notifications",
        element: <Notify />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/singin",
    element: <SignIn />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>

    </RouterProvider>
  </StrictMode>
);
