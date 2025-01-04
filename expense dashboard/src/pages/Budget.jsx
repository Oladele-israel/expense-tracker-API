import { useState } from "react";
import { useDashboardContext } from "../Hooks/dashboardContext.jsx";
import axios from "axios";
import Loader from "../components/Loader.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const BudgetApp = () => {
  const { loadBudget, error, totalBudget, budgets } = useDashboardContext();
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
  });
  const [budget, setbudget] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const categories = [
    "Groceries",
    "Leisure",
    "Electronics",
    "Utilities",
    "Clothing",
    "Health",
    "Others",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    if (!formData.category || !formData.amount) {
      setMessage("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await axios.post(
        `${API_BASE_URL}/budgets/create`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setbudget((prev) => [...prev, response.data]);

      setMessage("Budget created successfully!");
      setFormData({ category: "", amount: "" });
    } catch (error) {
      setMessage("Failed to create budget. Please try again.");
      console.error("Error creating budget:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-5  w-[70vw]  min-h-screen md:gap-2 lg:mr-10 lg:ml-auto ">
      <div className="lg:w-[650px] w-[300px] md:w-[700px] lg:h-[400px]  mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Budget Manager
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div>
            <label
              htmlFor="category"
              className="block text-gray-700 font-medium mb-2"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="amount"
              className="block text-gray-700 font-medium mb-2"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 transition duration-300 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Create Budget"}
            </button>
          </div>
        </form>

        {/* Message */}
        {message && (
          <div
            className={`mb-4 p-3 rounded-md text-center ${
              message.includes("successfully")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
      </div>
      {/* Expenses Table */}
      <div className="mt-10">
        <div className="flex justify-between p-2">
          <div className="capitalize font-bold text-xl text-slate-700">
            budgets
          </div>
          <button className="bg-blue-700 p-2 w-32 rounded-md text-white text-xl cursor-pointer hover">
            Print
          </button>
        </div>

        {/* Show a spinner while data is loading */}
        {loadBudget ? (
          <Loader />
        ) : budgets.length === 0 ? (
          <p className="text-gray-500">No budget yet</p>
        ) : (
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Category
                </th>
                <th className="border border-gray-300 px-4 py-2 text-right">
                  Amount ($)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {budgets.map((expense, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {expense.category}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {parseFloat(expense.amount).toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {new Date().toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BudgetApp;
