import { useState } from "react";

export const Modal = () => {
  const [modalType, setModalType] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const handleModalClose = () => {
    setModalType(null);
    setSelectedExpense(null);
  };

  return (
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
};
