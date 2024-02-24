import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, useNavigate,redirect, Outlet } from "react-router-dom";
import Login from "./routes/Login.tsx";
import ErrorPage from "./error-page.tsx";
import Dashboard from "./routes/Dashboard.tsx";
import Register from "./routes/Register.tsx";
import AuthProvider from "./context/AuthProvider.tsx";
import DataProvider from "./context/DataProvider.tsx";
import UserProfile from "./routes/UserProfile.tsx";
import ProtectedRoute from "./routes/ProtectedRoutes.tsx";

// handle routing for the app
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    element: <ProtectedRoute />,
    children:[

      {
        path: "/dashboard",
        element: <Dashboard />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
        errorElement: <ErrorPage />,
      },
    ],
    loader:async () => {
      const token = localStorage.getItem("token");
      if (!token) {
     return redirect("/login"); 
      }else{
        return <Outlet />;
      };
    
    },
  }
  
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>    
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </AuthProvider>
  </React.StrictMode>
);
