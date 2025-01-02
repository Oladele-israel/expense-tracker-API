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
              <td className="border border-gray-300 p-2">${expense.amount}</td>
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
