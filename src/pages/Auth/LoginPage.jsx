import React from "react";
import { Helmet } from "react-helmet-async";
import LoginComponent from "../../components/General/Auth/LoginComponent";

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Login | SuikaDev</title>
      </Helmet>
      <LoginComponent />
    </>
  );
};

export default LoginPage;
