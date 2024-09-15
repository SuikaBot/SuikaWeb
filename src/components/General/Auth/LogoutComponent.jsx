import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ENDPOINTS } from "../../../utils/contants/endpoint";

const LogoutComponent = () => {
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      Swal.fire({
        title: "Do you want to Log out?",
        showCancelButton: true,
        confirmButtonText: "Sure",
        icon: "question",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#a3a5a6",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Logout Successfully!",
            confirmButtonText: "Ok",
            icon: "success",
            confirmButtonColor: "#3085d6",
          }).then(() => {
            axios.delete(ENDPOINTS.LOGOUT);
            localStorage.clear();
            navigate("/sb/login");
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <button
        onClick={Logout}
        className="transition delay-75 flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-white bg-danger hover:bg-danger-hover dark:hover:text-white-300"
        type="button"
      >
        <FontAwesomeIcon
          className="flex-shrink-0 w-4 h-4"
          icon="fa-solid fa-arrow-right-from-bracket"
        />
        Log Out
      </button>
    </>
  );
};

export default LogoutComponent;
