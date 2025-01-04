import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const validateToken = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${API_BASE_URL}/user/validateUser`, {
          withCredentials: true,
        });

        if (data?.success) {
          setUserDetails(data.authUser);
          setIsAuthenticated(true);
          setMessage(data.message || "Token validated successfully.");
        } else {
          setIsAuthenticated(false);
          setMessage("Validation of token did not work.");
        }
      } catch (err) {
        setIsAuthenticated(false);
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.message ||
              "An error occurred during validation."
          );
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [API_BASE_URL]);

  return (
    <AuthContext.Provider
      value={{
        userDetails,
        setUserDetails,
        loading,
        message,
        error,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
