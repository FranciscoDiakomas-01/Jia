import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.jsx';
import './index.css'
import { register } from "swiper/element/bundle";
import Main from './pages/Main/index.jsx';
import Users from './pages/Users/index.jsx';
import Posts from './pages/Posts/index.jsx';
import Folowers from './pages/Followers'
import UsersProfile from "./pages/UsersProfile/index";
import Followings from './pages/followings/index.jsx';
import PostForm from './components/Postform/index.jsx';
import PostDetails from './components/PostDetails/index.jsx';
register()
import 'swiper/css'
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Acount from './pages/Count/index.jsx';
import Notify from './pages/Notify/index.jsx';
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
        path: "/followers",
        element: <Folowers />,
      },
      {
        path: "/userProfile",
        element: <UsersProfile />,
      },
      {
        path: "/followings",
        element: <Followings />,
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
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>

    </RouterProvider>
  </StrictMode>
);
