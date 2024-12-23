import { useState } from "react";
import { Mail, Eye, EyeOff, Facebook, Apple } from "lucide-react";

const Login = () => {
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 lg:p-4">
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
          <div className="mb-4">
            <label className="block text-gray-700 mb-3">Password</label>
            <div className="flex items-center border rounded-md">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full p-2 outline-none"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="m-2"
              >
                {showPassword ? (
                  <EyeOff className="text-gray-400" />
                ) : (
                  <Eye className="text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 mb-4 mt-3 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
          <p className="text-center text-gray-700">
            Dont have an account?
            <a href="#" className="text-blue-600 font-semibold">
              Sign up Instead
            </a>
          </p>
        </form>
        <div className="flex items-center justify-center my-4">
          <div className="border-b w-full" />
          <span className="px-2 text-gray-500">OR</span>
          <div className="border-b w-full" />
        </div>
        <div className="flex gap-4 justify-center">
          <button className="flex items-center justify-center w-10 h-10 bg-blue-700 rounded-full">
            <Facebook className="text-slate-100" />
          </button>
          <button className="flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-full">
            <Mail className="text-gray-600" />
          </button>
          <button className="flex items-center justify-center w-10 h-10 bg-black rounded-full">
            <Apple className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
