import { useState } from "react";
import axios from "axios"; // Ensure axios is imported
import infinity from "../assets/images/infinity.png";
import signup from "../assets/images/signup.png";
import { Lock, Mail, User, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/signup`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Signup successful:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-r from-[#080357] to-[#0A2FB9] min-h-screen w-screen flex justify-center items-center shadow-lg">
      <form
        onSubmit={handleSubmit}
        className="md:w-[500px] h-[600px] bg-white rounded-xl md:rounded-l-3xl p-7 flex flex-col justify-center gap-6 shadow-lg"
      >
        <img
          src={infinity}
          alt="Infinity Logo"
          width={100}
          className="mx-auto"
          loading="lazy"
        />

        {/* Name Field */}
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
          <User className="text-gray-400 mr-2" />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full outline-none text-gray-700 p-2"
            required
          />
        </div>

        {/* Email Field */}
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
          <Mail className="text-gray-400 mr-2" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full outline-none text-gray-700 p-2"
            required
          />
        </div>

        {/* Password Field */}
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
          <Lock className="text-gray-400 mr-2" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full outline-none text-gray-700 p-2"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition text-xl"
        >
          {isSubmitting ? "Signing Up..." : "Sign In"}
        </button>

        {/* Signup with Providers */}
        <fieldset className="border-t border-gray-300 pt-4">
          <legend className="text-gray-500 px-2 text-center">
            Or sign up with
          </legend>
          <div className="flex justify-center gap-4 mt-4">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
            >
              <LogIn className="text-blue-500" />
              Google
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
            >
              <LogIn className="text-green-500" />
              Other Provider
            </button>
          </div>
        </fieldset>
      </form>
      <div
        className="w-[500px] h-[600px] rounded-r-3xl hidden lg:block"
        style={{
          backgroundImage: `url(${signup})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </section>
  );
};

export default Signup;
