import { useState } from "react";
import axios from "axios";
import infinity from "../assets/images/infinity.png";
import { Lock, Mail, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Hooks/authContext.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const { setUserDetails, setIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      const { data } = await axios.post(
        `${API_BASE_URL}/user/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (data.success) {
        setUserDetails(data.user);
        setIsAuthenticated(true);
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-r from-[#080357] to-[#0A2FB9] min-h-screen w-screen flex justify-center items-center shadow-lg ">
      <form
        onSubmit={handleSubmit}
        className="md:w-[500px] h-[600px] bg-white rounded-xl md:rounded-l-3xl p-7 flex flex-col justify-center gap-6 shadow-lg"
      >
        <img
          src={infinity}
          alt=""
          width={100}
          className="ml-auto mr-auto"
          loading="lazy"
        />

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
          {isSubmitting ? "logging in..." : "login"}
        </button>

        {/* Signup with Providers */}
        <fieldset className="border-t border-gray-300 pt-4">
          <legend className="text-gray-500 px-2 text-center">
            Or signup with
          </legend>
          <div className="flex justify-center gap-4 mt-4">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition "
            >
              <LogIn className="text-blue-500" />
              Google
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition p-2"
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
          backgroundImage: `url(${infinity})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </section>
  );
};

export default Login;
