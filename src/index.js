import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import ErrorPage from './NotFound';
import App from './App';
import reportWebVitals from './reportWebVitals';
import BlogList from './BlogList';
import BlogPost from './BlogPost';
import Favorites from './Favorites';
import Login from './components/Login';
import Register from './components/Register';
import Reset from './components/Reset';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/BlogLists",
    element: <BlogList />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/BlogPost/:id",
    element: <BlogPost />,
    errorElement: <ErrorPage />,
  },{
    path: "/MyFavorite",
    element: <Favorites />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/LogIn",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/ResertPassword",
    element: <Reset />,
    errorElement: <ErrorPage />,
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

