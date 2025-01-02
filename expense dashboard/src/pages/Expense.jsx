import { useState } from "react";
import { Edit, Trash } from "lucide-react";

const ExpenseManager = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [modalType, setModalType] = useState(null); // 'update' or 'delete'
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

  const CreateExpenseForm = () => (
    <form className="mt-4 p-4 border rounded-md bg-gray-100">
      <h2 className="text-lg font-semibold mb-4">Create Expense</h2>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium" htmlFor="expenseName">
          Expense Name
        </label>
        <input
          type="text"
          id="expenseName"
          className="w-full p-2 border rounded-md"
          placeholder="Enter expense name"
        />
      </div>
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-medium"
          htmlFor="expenseAmount"
        >
          Amount
        </label>
        <input
          type="number"
          id="expenseAmount"
          className="w-full p-2 border rounded-md"
          placeholder="Enter amount"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 active:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );

  const ViewExpensesTable = () => {
    const expenses = [
      { id: 1, name: "Example Expense", amount: 100, date: "2025-01-01" },
      { id: 2, name: "Another Expense", amount: 200, date: "2025-01-02" },
    ];

    return (
      <div className="mt-4 p-4 border rounded-md bg-gray-100">
        <h2 className="text-lg font-semibold mb-4">All Expenses</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Expense Name</th>
              <th className="border border-gray-300 p-2">Amount</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td className="border border-gray-300 p-2">{expense.name}</td>
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
      </div>
    );
  };

  const Modal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-96">
        {modalType === "update" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Update Expense</h2>
            <form>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-medium"
                  htmlFor="updateExpenseName"
                >
                  Expense Name
                </label>
                <input
                  type="text"
                  id="updateExpenseName"
                  defaultValue={selectedExpense?.name}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-medium"
                  htmlFor="updateExpenseAmount"
                >
                  Amount
                </label>
                <input
                  type="number"
                  id="updateExpenseAmount"
                  defaultValue={selectedExpense?.amount}
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
          </div>
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
              <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 active:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="bg-white w-full min-h-screen p-6 ml-72">
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
