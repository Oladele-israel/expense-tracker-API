import infinity from "../assets/images/infinity.png";
import signup from "../assets/images/signup.png";
import { Lock, Mail, User, LogIn } from "lucide-react";
const Signup = () => {
  return (
    <section className="bg-gradient-to-r from-[#080357] to-[#0A2FB9] min-h-screen w-screen flex justify-center items-center shadow-lg  ">
      <form className="md:w-[500px] h-[600px] bg-white rounded-xl md:rounded-l-3xl p-7 flex flex-col justify-center gap-6 shadow-lg">
        <img src={infinity} alt="" width={100} className="ml-auto mr-auto" />

        {/* Name Field */}
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
          <User className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Name"
            className="w-full outline-none text-gray-700 p-2"
          />
        </div>

        {/* Email Field */}
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
          <Mail className="text-gray-400 mr-2" />
          <input
            type="email"
            placeholder="Email"
            className="w-full outline-none text-gray-700 p-2"
          />
        </div>

        {/* Password Field */}
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
          <Lock className="text-gray-400 mr-2" />
          <input
            type="password"
            placeholder="Password"
            className="w-full outline-none text-gray-700 p-2"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition p-2 text-xl"
        >
          Sign In
        </button>

        {/* Signup with Providers */}
        <fieldset className="border-t border-gray-300 pt-4">
          <legend className="text-gray-500 px-2 text-center">
            Or sign up with
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
          backgroundImage: `url(${signup})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </section>
  );
};

export default Signup;
