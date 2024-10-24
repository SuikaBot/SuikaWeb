import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { ENDPOINTS } from "../utils/contants/endpoint";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  // const [refreshToken, setRefreshToken] = useState("");

  // useEffect(() => {
  //   const getToken = async () => {
  //     try {
  //       const response = await axios.get(ENDPOINTS.TOKEN);
  //       console.log(response);
  //       setRefreshToken(response.refresh_token);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getToken();
  // }, []);

  // console.log(refreshToken);

  const getUserData = () => {
    const data = JSON.parse(localStorage.getItem("user_data"));
    // console.log(data);

    return data;
  };

  return (
    <UserContext.Provider value={{ getUserData }}>
      {children}
    </UserContext.Provider>
  );
};
