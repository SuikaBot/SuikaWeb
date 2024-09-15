import { createContext, useContext } from "react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const getUserData = () => {
    const data = JSON.parse(localStorage.getItem("user_data"));

    return data;
  };

  return (
    <UserContext.Provider value={{ getUserData }}>
      {children}
    </UserContext.Provider>
  );
};
