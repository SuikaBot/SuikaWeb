import { useState } from "react";

import axios from "axios";
import Swal from "sweetalert2";
import { ENDPOINTS } from "../../../utils/contants/endpoint";

import ModalCore from "../../General/Modals/ModalCore";
import InputText from "../../General/Modals/InputText";
import InputRadio from "../../General/Modals/InputRadio";
import SwitchToggle from "../../General/DataTables/SwitchToggle";

const ModalAddUsers = ({ token, roles, open, setOpen, render }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
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
          username: username,
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

      render();
      Swal.fire({
        title: "Success Add Data",
        icon: "success",
        confirmButtonColor: "#3085d6",
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
      <div className="grid grid-cols-1 sm:grid-cols-10 gap-3">
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
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-10 gap-3">
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
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-10 gap-3">
        <InputText
          name={"username"}
          title={"Username"}
          type={"text"}
          value={username}
          inputChange={(e) => setUsername(e.target.value)}
          placeholder={"SuikaDev123"}
        />

        <div className="col-span-5">
          <label
            htmlFor={`hs-is_active`}
            className="block text-md font-medium mb-2"
          >
            Active User
          </label>
          <SwitchToggle
            status={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            name={"is_active"}
          />
        </div>
      </div>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-10 gap-3">
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
      </div>
    </ModalCore>
  );
};

export default ModalAddUsers;
