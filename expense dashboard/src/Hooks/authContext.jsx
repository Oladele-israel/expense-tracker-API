import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  // Define the base URL as an environment variable for flexibility
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const validateToken = async () => {
      setLoading(true); // Ensure loading is true at the start of the call
      try {
        const { data } = await axios.get(`${API_BASE_URL}/user/validateToken`, {
          withCredentials: true,
        });

        if (data?.success) {
          setUserDetails(data.userDetail);
          setMessage(data.message || "Token validated successfully.");
        } else {
          setMessage("Validation of token did not work.");
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.message ||
              "An error occurred during validation."
          );
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false); // Ensure loading stops regardless of success or error
      }
    };

    validateToken();
  }, [API_BASE_URL]); // Ensure dependency array includes dynamic values

  return (
    <AuthContext.Provider
      value={{ userDetails, setUserDetails, loading, message, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
