import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ENDPOINTS } from "../../../utils/contants/endpoint";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const refreshToken = Cookies.get("refresh_token", { path: "/" });
  // console.log("Refresh token:", refreshToken);

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

      const data = response.data.data;
      localStorage.setItem("user_data", JSON.stringify(data));
      Swal.fire({
        title: "Login Success!",
        html: `Welcome ${data.name}`,
        icon: "success",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/sb/dashboard");
      });
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
              {/* <p className="mt-2 text-sm text-gray-600">
                {"Don't have an account yet?"}{" "}
                <NavLink
                  className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium"
                  to="/sb/register"
                >
                  Sign up here
                </NavLink>
              </p> */}
            </div>

            <div className="my-5">
              {/* <button
                type="button"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              >
                <svg
                  className="w-4 h-auto"
                  width="46"
                  height="47"
                  viewBox="0 0 46 47"
                  fill="none"
                >
                  <path
                    d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                    fill="#34A853"
                  />
                  <path
                    d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                    fill="#EB4335"
                  />
                </svg>
                Sign in with Google
              </button> */}

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
