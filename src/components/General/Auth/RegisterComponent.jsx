import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ENDPOINTS } from "../../../utils/contants/endpoint";

const RegisterComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios.post(ENDPOINTS.REGISTER, {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
      });

      Swal.fire({
        title: "Register Success!",
        text: "Your account status is pending, wait for approval...",
        icon: "success",
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/sb/login");
      });
    } catch (error) {
      if (error.response && error.response.data) {
        const errorsArray = error.response.data.errors || [];

        // Format errors into an object, but only keep the first error for each field
        const formattedErrors = errorsArray.reduce((acc, { path, msg }) => {
          if (!acc[path]) acc[path] = msg; // Only keep the first message for each field
          return acc;
        }, {});

        setErrors(formattedErrors);

        let errorMessages = "<ul>";
        for (const [field, message] of Object.entries(formattedErrors)) {
          errorMessages += `<li>${message}</li>`;
        }
        errorMessages += "</ul>";

        Swal.fire({
          title: "Registration Failed",
          html: errorMessages,
          icon: "error",
          confirmButtonColor: "#d33",
          cancelButtonColor: "#a3a5a6",
        });
      } else {
        Swal.fire({
          title: "Registration Failed",
          text:
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

  // console.log(errors);
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-color3">
        <div className="w-full max-w-[25rem] sm:max-w-[30rem]">
          <div className="p-4 sm:p-7 rounded-xl bg-white border border-gray-200  shadow-sm">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800">
                Sign up
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Already have an account?{" "}
                <NavLink
                  className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium"
                  to={"/sb/login"}
                >
                  Sign in here
                </NavLink>
              </p>
            </div>

            <div className="mt-5">
              <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
                Suika-Dev
              </div>

              {/* <!-- Form --> */}
              <form onSubmit={Register}>
                <div className="grid gap-y-4">
                  {/* <!-- Form Group --> */}
                  <div>
                    <label htmlFor="email" className="block text-sm mb-2">
                      Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className={`py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 ${
                          errors.name ? "border-red-500" : ""
                        }`}
                        aria-describedby="name-error"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />

                      {errors.name && (
                        <div className="absolute inset-y-0 end-0 pointer-events-none pe-3">
                          <FontAwesomeIcon
                            className="size-5 text-red-500 pt-3"
                            icon="fa-solid fa-circle-exclamation"
                          />
                        </div>
                      )}
                    </div>
                    {errors.name && (
                      <p className="text-xs text-red-600 mt-2" id="name-error">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  {/* <!-- End Form Group --> */}

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
                          errors.email ? "border-red-500" : ""
                        }`}
                        aria-describedby="email-error"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && (
                        <div className="absolute inset-y-0 end-0 pointer-events-none pe-3">
                          <FontAwesomeIcon
                            className="size-5 text-red-500 pt-3"
                            icon="fa-solid fa-circle-exclamation"
                          />
                        </div>
                      )}
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-2" id="email-error">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  {/* <!-- End Form Group --> */}

                  {/* <!-- Form Group --> */}
                  <div>
                    <label htmlFor="password" className="block text-sm mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className={`py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 ${
                          errors.password ? "border-red-500" : ""
                        }`}
                        aria-describedby="password-error"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {errors.password && (
                        <div className="absolute inset-y-0 end-0 pointer-events-none pe-3">
                          <FontAwesomeIcon
                            className="size-5 text-red-500 pt-3"
                            icon="fa-solid fa-circle-exclamation"
                          />
                        </div>
                      )}
                    </div>
                    {errors.password && (
                      <p className="text-xs text-red-600 mt-2" id="email-error">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  {/* <!-- End Form Group --> */}

                  {/* <!-- Form Group --> */}
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block text-sm mb-2"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        className={`py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 ${
                          errors.confPassword ? "border-red-500" : ""
                        }`}
                        aria-describedby="confirm-password-error"
                        value={confPassword}
                        onChange={(e) => setConfPassword(e.target.value)}
                      />
                      {errors.confPassword && (
                        <div className="absolute inset-y-0 end-0 pointer-events-none pe-3">
                          <FontAwesomeIcon
                            className="size-5 text-red-500 pt-3"
                            icon="fa-solid fa-circle-exclamation"
                          />
                        </div>
                      )}
                    </div>
                    {errors.confPassword && (
                      <p className="text-xs text-red-600 mt-2" id="email-error">
                        {errors.confPassword}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Sign up
                  </button>
                </div>
              </form>
              {/* <!-- End Form --> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterComponent;
