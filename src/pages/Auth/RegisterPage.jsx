import RegisterComponent from "../../components/General/Auth/RegisterComponent";
import { Helmet } from "react-helmet-async";

const RegisterPage = () => {
  return (
    <>
      <Helmet>
        <title>Register | SuikaDev</title>
      </Helmet>
      <RegisterComponent />
    </>
  );
};

export default RegisterPage;
