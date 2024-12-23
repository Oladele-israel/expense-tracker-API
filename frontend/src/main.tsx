import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import DashboardLayout from "./Layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateProduct from "./pages/CreateProduct";
import CreateProductForm from "./pages/ExpiredProduct";
import SignUpPage from "./pages/SignUp";
import Login from "./pages/Login";
import EmailVerification from "./pages/EmailVerification";
import ForgotPassword from "./pages/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/dashboard", // Corrected typo in path
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "createProduct",
        element: <CreateProduct />,
      },
      {
        path: "expiredProduct",
        element: <CreateProductForm />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/verifyEmail",
    element: <EmailVerification />,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
