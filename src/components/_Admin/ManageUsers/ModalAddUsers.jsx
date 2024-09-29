import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";
import { ENDPOINTS } from "../../../utils/contants/endpoint";

import ModalCore from "../../General/Modals/ModalCore";
import InputText from "../../General/Modals/InputText";
import InputRadio from "../../General/Modals/InputRadio";
import SwitchToggle from "../../General/DataTables/SwitchToggle";

const ModalAddUsers = ({ token, roles, open, setOpen }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState();
  const [isActive, setIsActive] = useState(false);

  const addUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        ENDPOINTS.USERS,
        {
          name: name,
          email: email,
          password: password,
          confPassword: confPassword,
          role: role,
          is_active: isActive,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        title: "Success Add Data",
        icon: "success",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate(0);
      });
    } catch (error) {
      if (error.response.data.errors) {
        const errorMessages = {};
        error.response.data.errors.forEach((err) => {
          if (!errorMessages[err.path]) {
            errorMessages[err.path] = err.msg;
          }
        });

        const formattedErrors = Object.values(errorMessages)
          .map((msg) => `<li>- ${msg}</li>`)
          .join("");

        Swal.fire({
          title: "Failed Add Data",
          html: `<ul>${formattedErrors}</ul>`,
          icon: "error",
          confirmButtonColor: "#d33",
        });
      } else {
        Swal.fire({
          title: "Failed Add Data",
          text: `${error.response.data.message}`,
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  return (
    <ModalCore
      title={"Add New User"}
      btnTitle={"Save"}
      formSubmit={addUser}
      openModal={open}
      actClose={() => setOpen(false)}
    >
      <div className="mt-10 grid grid-cols-10 gap-3">
        <InputText
          name={"name"}
          title={"Name"}
          type={"text"}
          value={name}
          inputChange={(e) => setName(e.target.value)}
          placeholder={"Suika"}
        />
        <InputText
          name={"email"}
          title={"Email"}
          type={"email"}
          value={email}
          inputChange={(e) => setEmail(e.target.value)}
          placeholder={"dev@suika.pw"}
        />
      </div>
      <div className="mt-3 grid grid-cols-10 gap-3">
        <InputText
          name={"password"}
          title={"Password"}
          type={"password"}
          value={password}
          inputChange={(e) => setPassword(e.target.value)}
          placeholder={"*****"}
        />
        <InputText
          name={"confPassword"}
          title={"Conf Password"}
          type={"password"}
          value={confPassword}
          inputChange={(e) => setConfPassword(e.target.value)}
          placeholder={"*****"}
        />
      </div>
      <div className="mt-3 grid grid-cols-10 gap-3">
        <div className="col-span-5">
          <label
            htmlFor={`hs-role`}
            className="block text-md font-medium mb-2 dark:text-color4"
          >
            Role
          </label>
          {roles.map((data) => (
            <InputRadio
              key={data.value}
              name={data.value}
              title={"Role"}
              checked={role === data.value}
              value={data.value}
              inputChange={(e) => setRole(e.target.value)}
              placeholder={data.name}
            />
          ))}
        </div>
        <div className="col-span-5">
          <label
            htmlFor={`hs-is-active`}
            className="block text-md font-medium mb-2 dark:text-color4"
          >
            Is Active
          </label>
          <SwitchToggle
            status={isActive}
            onChange={(e) => {
              setIsActive(e.target.checked);
            }}
          />
        </div>
      </div>
    </ModalCore>
  );
};

export default ModalAddUsers;
