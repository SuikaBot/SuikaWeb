import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  useEffect(() => {
    const checkTokenExpiration = (token) => {
      if (!token) return false;

      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Waktu sekarang dalam detik
      return decoded.exp < currentTime; // Kembalikan true jika token kadaluarsa
    };

    if (token) {
      if (checkTokenExpiration(token)) {
        // console.log("Token kadaluarsa");
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
        setToken_(null); // Atur token ke null
      } else {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        // console.log("Token ditemukan");
        localStorage.setItem("token", token);
      }
    } else {
      // console.log("Token tidak ditemukan");
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
