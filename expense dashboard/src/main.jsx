import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Signup from "../src/pages/Signup.jsx";
import Login from "../src/pages/Login.jsx";
import { AuthContextProvider } from "./Hooks/authContext.jsx";
import { DashboardContextProvider } from "./Hooks/dashboardContext.jsx";
import ProtectedRoute from "./Hooks/ProtectedRoute.jsx";
import Budget from "../src/pages/Budget.jsx";
import Expense from "../src/pages/Expense.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardContextProvider>
          <DashboardLayout />
        </DashboardContextProvider>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/budget",
        element: <Budget />,
      },
      {
        path: "/expense",
        element: <Expense />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>
);
