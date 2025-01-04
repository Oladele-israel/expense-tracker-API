import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const DashboardContext = createContext();

export const useDashboardContext = () => useContext(DashboardContext);

export const DashboardContextProvider = ({ children }) => {
  const [loadBudget, setLoadBudget] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [expenses, setExpenses] = useState(null);
  const [totalBudget, setTotalBudget] = useState(null);
  const [budgets, setBudgets] = useState([]);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchDashboardData = async () => {
      const controller = new AbortController();
      const signal = controller.signal;

      setLoadBudget(true);
      try {
        const [totalBudgetResponse, budgetsResponse, expenseResponse] =
          await Promise.all([
            axios.get(`${API_BASE_URL}/budgets/total`, {
              signal,
              withCredentials: true,
            }),
            axios.get(`${API_BASE_URL}/budgets/`, {
              signal,
              withCredentials: true,
            }),
            axios.get(`${API_BASE_URL}/expense/`, {
              signal,
              withCredentials: true,
            }),
          ]);

        setTotalBudget(totalBudgetResponse.data.totalBudget);
        setBudgets(budgetsResponse.data.budgets);
        setExpenses(expenseResponse.data.expenses);
        setMessage("Dashboard data fetched successfully.");
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("Axios Error:", err.response?.data);
          setError(
            err.response?.data?.message || "An error occurred during API calls."
          );
        } else if (err.name !== "CanceledError") {
          console.error("Unexpected Error:", err);
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoadBudget(false);
      }

      return () => controller.abort();
    };

    fetchDashboardData();
  }, [API_BASE_URL]);

  return (
    <DashboardContext.Provider
      value={{
        loadBudget,
        message,
        error,
        totalBudget,
        expenses,
        budgets,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
