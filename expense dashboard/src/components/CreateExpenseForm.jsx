export const CreateExpenseForm = () => (
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
      <label className="block mb-2 text-sm font-medium" htmlFor="expenseAmount">
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
