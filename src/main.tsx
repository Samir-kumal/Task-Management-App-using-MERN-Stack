import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/Login.tsx";
import ErrorPage from "./error-page.tsx";
import Dashboard from "./routes/Dashboard.tsx";
import Register from "./routes/Register.tsx";
import AuthProvider from "./context/AuthProvider.tsx";
import DataProvider from "./context/DataProvider.tsx";
import UserProfile from "./routes/UserProfile.tsx";
import Root from "./routes/root.tsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.tsx";

const token = localStorage.getItem("token");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
    path: "/dashboard",
    element: (
      <ProtectedRoutes>
        <Dashboard />
      </ProtectedRoutes>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoutes>
        <UserProfile />
      </ProtectedRoutes>
    ),
    errorElement: <ErrorPage />,
  },
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
