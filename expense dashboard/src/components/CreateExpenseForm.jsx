import { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const CreateExpenseForm = () => {
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
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("Expense submitted successfully:", response.data);
      alert("Expense created successfully!");

      // Reset form fields after successful submission
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

      {/* Title */}
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
          placeholder="Enter expense title"
          required
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          placeholder="Enter description"
          rows="4"
          required
        />
      </div>

      {/* Amount */}
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
          placeholder="Enter amount"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 active:bg-blue-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};
