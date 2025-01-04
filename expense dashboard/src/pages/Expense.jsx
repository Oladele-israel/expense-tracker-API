import { useState, useEffect } from "react";
import { Edit, Trash } from "lucide-react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ExpenseManager = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [modalType, setModalType] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleModalOpen = (type, expense) => {
    setModalType(type);
    setSelectedExpense(expense);
  };

  const handleModalClose = () => {
    setModalType(null);
    setSelectedExpense(null);
  };

  const CreateExpenseForm = () => {
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      amount: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        const response = await axios.post(
          `${API_BASE_URL}/expense/create`,
          {
            title: formData.title,
            description: formData.description,
            amount: parseFloat(formData.amount),
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        alert("Expense created successfully!");
        setFormData({ title: "", description: "", amount: "" });
      } catch (error) {
        console.error(
          "Error submitting expense:",
          error.response?.data || error.message
        );
        alert("Failed to create expense. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <form
        onSubmit={handleSubmit}
        className="mt-4 p-4 border rounded-md bg-gray-100"
      >
        <h2 className="text-lg font-semibold mb-4">Create Expense</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-blue-500 text-white py-2 px-4 rounded-md ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    );
  };

  const ViewExpensesTable = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [selectedExpense, setSelectedExpense] = useState(null);

    useEffect(() => {
      const fetchExpenses = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/expense/`, {
            withCredentials: true,
          });
          setExpenses(response.data.expenses);
        } catch (error) {
          setError("Failed to fetch expenses. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      fetchExpenses();
    }, []);

    const handleModalOpen = (type, expense) => {
      setModalType(type);
      setSelectedExpense(expense);
    };

    const handleModalClose = () => {
      setModalType(null);
      setSelectedExpense(null);
    };

    const handleUpdateExpense = async (e) => {
      e.preventDefault();
      const updatedData = {
        title: e.target.updateTitle.value,
        amount: e.target.updateAmount.value,
        description: e.target.updateAmount.value,
        category: e.target.updateCategory.value,
      };

      try {
        await axios.put(
          `${API_BASE_URL}/expense/${selectedExpense.id}`,
          updatedData,
          {
            withCredentials: true,
          }
        );
        setExpenses((prev) =>
          prev.map((expense) =>
            expense.id === selectedExpense.id
              ? { ...expense, ...updatedData }
              : expense
          )
        );
        handleModalClose();
      } catch (error) {
        console.error("Failed to update expense:", error.message);
      }
    };

    const handleDeleteExpense = async () => {
      try {
        await axios.delete(`${API_BASE_URL}/expense/${selectedExpense.id}`, {
          withCredentials: true,
        });
        setExpenses((prev) =>
          prev.filter((expense) => expense.id !== selectedExpense.id)
        );
        handleModalClose();
      } catch (error) {
        console.error("Failed to delete expense:", error.message);
      }
    };

    if (loading) {
      return <div className="mt-4 p-4 text-gray-700">Loading expenses...</div>;
    }

    if (error) {
      return <div className="mt-4 p-4 text-red-500">{error}</div>;
    }

    return (
      <div className="mt-4 p-4 border rounded-md bg-gray-100">
        <h2 className="text-lg font-semibold mb-4">All Expenses</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Amount</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td className="border border-gray-300 p-2">{expense.title}</td>
                <td className="border border-gray-300 p-2">
                  {expense.description}
                </td>
                <td className="border border-gray-300 p-2">
                  ${expense.amount}
                </td>
                <td className="border border-gray-300 p-2">{expense.date}</td>
                <td className="border border-gray-300 p-2 flex gap-2">
                  <button
                    onClick={() => handleModalOpen("update", expense)}
                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 active:bg-green-700 flex items-center gap-1"
                  >
                    <Edit size={16} /> Update
                  </button>
                  <button
                    onClick={() => handleModalOpen("delete", expense)}
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 active:bg-red-700 flex items-center gap-1"
                  >
                    <Trash size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {modalType && (
          <Modal
            modalType={modalType}
            selectedExpense={selectedExpense}
            handleModalClose={handleModalClose}
            handleUpdateExpense={handleUpdateExpense}
            handleDeleteExpense={handleDeleteExpense}
          />
        )}
      </div>
    );
  };

  const Modal = ({
    modalType,
    selectedExpense,
    handleModalClose,
    handleUpdateExpense,
    handleDeleteExpense,
  }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-96">
        {modalType === "update" && (
          <form onSubmit={handleUpdateExpense}>
            <h2 className="text-lg font-semibold mb-4">Update Expense</h2>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="updateTitle"
              >
                Title
              </label>
              <input
                type="text"
                id="updateTitle"
                defaultValue={selectedExpense?.title}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="updateAmount"
              >
                Amount
              </label>
              <input
                type="number"
                id="updateAmount"
                defaultValue={selectedExpense?.amount}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="updateAmount"
              >
                Description
              </label>
              <input
                type="text"
                id="updateDescription"
                defaultValue={selectedExpense?.description}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="updateCategory"
              >
                Category
              </label>
              <input
                type="text"
                id="updateCategory"
                defaultValue={selectedExpense?.category}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 active:bg-blue-700"
            >
              Update
            </button>
          </form>
        )}
        {modalType === "delete" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this expense?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={handleModalClose}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteExpense}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 active:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="bg-white w-full min-h-screen p-6 ml-64">
      <div className="text-2xl capitalize p-2 border-b">Expenses</div>

      <div className="border-b flex gap-2 mt-2">
        <button
          onClick={() => handleTabChange("create")}
          className={`p-2 rounded-t-md transition-colors duration-200 ${
            activeTab === "create"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
        >
          Create Expense
        </button>
        <button
          onClick={() => handleTabChange("view")}
          className={`p-2 rounded-t-md transition-colors duration-200 ${
            activeTab === "view"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
        >
          View All Expenses
        </button>
      </div>

      {activeTab === "create" && <CreateExpenseForm />}
      {activeTab === "view" && <ViewExpensesTable />}

      {modalType && <Modal />}
    </section>
  );
};

export default ExpenseManager;
