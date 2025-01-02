import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx"; // Ensure the correct relative path
import Signup from "./pages/signup.jsx";
import Login from "./pages/Login.jsx";
import { AuthContextProvider } from "./Hooks/authContext.jsx";
import { DashboardContextProvider } from "./Hooks/dashboardContext.jsx";
import ProtectedRoute from "./Hooks/protectedRoute.jsx";
import Budget from "./pages/Budget.jsx";
import Expense from "./pages/Expense.jsx";
import Profile from "./pages/Profile.jsx";
import Insights from "./pages/Insights.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthContextProvider>
        <ProtectedRoute>
          <DashboardContextProvider>
            <DashboardLayout />
          </DashboardContextProvider>
        </ProtectedRoute>
      </AuthContextProvider>
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
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/insights",
        element: <Insights />,
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
    <RouterProvider router={router} />
  </StrictMode>
);
