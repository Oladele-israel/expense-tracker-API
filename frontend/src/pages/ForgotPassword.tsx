import { useState } from "react";
import { Mail, Eye, EyeOff, Facebook, Apple } from "lucide-react";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 lg:p-4">
      <div className="w-[90vw] max-w-md bg-white p-2 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6 p-2">
          LogoX
        </h2>
        <form onSubmit={handleSubmit} className="w-[100%] p-2">
          <div className="mb-4">
            <label className="block text-gray-700 mb-3">Email Address</label>
            <div className="flex items-center border rounded-md">
              <Mail className="text-gray-400 m-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="w-full p-2 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 mb-4 mt-3 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
          <p className="text-center text-gray-700">
            Return to{" "}
            <a href="#" className="text-blue-600 font-semibold">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
