import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Explicit state

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const validateToken = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${API_BASE_URL}/user/validateUser`, {
          withCredentials: true,
        });

        console.log("this is the user", data);

        if (data?.success) {
          setUserDetails(data.authUser);
          setIsAuthenticated(true); // Set authenticated state
          setMessage(data.message || "Token validated successfully.");
        } else {
          setIsAuthenticated(false); // Not authenticated
          setMessage("Validation of token did not work.");
        }
      } catch (err) {
        setIsAuthenticated(false); // Handle errors as unauthenticated
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