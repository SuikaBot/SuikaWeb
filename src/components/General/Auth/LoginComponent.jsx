import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ENDPOINTS } from "../../../utils/contants/endpoint";
import { useDispatch } from "react-redux";
import { getDataUser } from "../../../features/actions";
import { useAuth } from "../../../provider/authProvider";
import { setAccessToken } from "../../../features/userSlice";

const LoginComponent = () => {
  const dispatch = useDispatch();
  const { setToken } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const swalForgotPw = () => {
    Swal.fire({
      html: `Please contact the administrator to reset your password`,
      icon: "info",
      confirmButtonColor: "#3085d6",
    });
  };

  const Login = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Checking...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await axios.post(ENDPOINTS.LOGIN, {
        email: email,
        password: password,
      });

      const token = response.data.data.access_token;
      const userData = await dispatch(getDataUser(token));

      await dispatch(getDataUser(token));
      dispatch(setAccessToken(token));
      setToken(token);

      Swal.fire({
        title: "Login Success!",
        html: `Welcome ${userData.username}`,
        icon: "success",
        confirmButtonColor: "#3085d6",
      });

      navigate("/sb/dashboard", { replace: true });
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        const errorsArray = error.response.data.errors || [];

        const formattedErrors = errorsArray.reduce((acc, { path, msg }) => {
          if (!acc[path]) acc[path] = msg;
          return acc;
        }, {});

        let errorMessages = "<ul>";

        if (
          formattedErrors.email === "Email or Password is incorrect" ||
          formattedErrors.password === "Email or Password is incorrect"
        ) {
          setErrors({
            email: "Email or Password is incorrect",
            password: "Email or Password is incorrect",
          });
          errorMessages += `<li>Email or Password is incorrect</li>`;
        } else {
          if (
            formattedErrors.password ===
            "Your account is inactive. Please contact support"
          ) {
            setErrors({
              general: "Your account is inactive. Please contact support",
            });
            errorMessages += `<li>Your account is inactive. Please contact support</li>`;
          } else {
            setErrors(formattedErrors);
            for (let key in formattedErrors) {
              if (Object.prototype.hasOwnProperty.call(formattedErrors, key)) {
                const prefix =
                  Object.keys(formattedErrors).length > 1 ? "-" : "";
                errorMessages += `<li>${prefix} ${formattedErrors[key]}</li>`;
              }
            }
          }
        }

        errorMessages += "</ul>";

        Swal.fire({
          title: "Login Failed",
          html: errorMessages,
          icon: "error",
          confirmButtonColor: "#d33",
          cancelButtonColor: "#a3a5a6",
        });
      } else {
        Swal.fire({
          title: "Login Failed",
          html:
            error.code === "ERR_NETWORK"
              ? "Connection Failed"
              : "Unexpected Error",
          icon: "error",
          confirmButtonColor: "#d33",
          cancelButtonColor: "#a3a5a6",
        });
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-blue-500">
        <div className="w-full max-w-[25rem] sm:max-w-[30rem] mx-3">
          <div className="p-4 sm:p-7 rounded-xl bg-white border border-gray-200  shadow-sm">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800">
                Sign in
              </h1>
            </div>

            <div className="my-5">
              <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
                Suika-Dev
              </div>

              {/* <!-- Form --> */}
              <form onSubmit={Login}>
                <div className="grid gap-y-4">
                  {errors.general && (
                    <p className="underline text-center text-sm text-red-500 mt-2">
                      {errors.general}!
                    </p>
                  )}

                  {/* <!-- Form Group --> */}
                  <div>
                    <label htmlFor="email" className="block text-sm mb-2">
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="email"
                        name="email"
                        className={`py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 ${
                          errors.email || errors.general ? "border-red-500" : ""
                        }`}
                        aria-describedby="email-error"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {(errors.email || errors.general) && (
                        <div className="absolute inset-y-0 end-0 pointer-events-none pe-3">
                          <FontAwesomeIcon
                            className="size-5 text-red-500 pt-3"
                            icon="fa-solid fa-circle-exclamation"
                          />
                        </div>
                      )}
                    </div>
                    {(errors.email || errors.general) && (
                      <p className="text-xs text-red-600 mt-2" id="email-error">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  {/* <!-- End Form Group --> */}

                  {/* <!-- Form Group --> */}
                  <div>
                    <div className="flex justify-between items-center">
                      <label htmlFor="password" className="block text-sm mb-2">
                        Password
                      </label>
                      <NavLink
                        onClick={swalForgotPw}
                        className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium"
                        to={"#"}
                      >
                        Forgot password?
                      </NavLink>
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className={`py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 ${
                          errors.password || errors.general
                            ? "border-red-500"
                            : ""
                        }`}
                        aria-describedby="password-error"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {(errors.password || errors.general) && (
                        <div className="absolute inset-y-0 end-0 pointer-events-none pe-3">
                          <FontAwesomeIcon
                            className="size-5 text-red-500 pt-3"
                            icon="fa-solid fa-circle-exclamation"
                          />
                        </div>
                      )}
                    </div>
                    {(errors.password || errors.general) && (
                      <p className="text-xs text-red-600 mt-2" id="email-error">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  {/* <!-- End Form Group --> */}

                  {/* <!-- Checkbox --> */}
                  <div className="flex items-center">
                    <div className="flex">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="ms-3">
                      <label htmlFor="remember-me" className="text-sm">
                        Remember me
                      </label>
                    </div>
                  </div>
                  {/* <!-- End Checkbox --> */}

                  <button
                    type="submit"
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Sign in
                  </button>
                </div>
              </form>

              {/* <!-- End Form --> */}
            </div>
            <Link
              to={"/"}
              className="text-sm font-semibold text-blue-500 underline"
            >
              <FontAwesomeIcon icon="fa-solid fa-chevron-left" /> Landingpage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
