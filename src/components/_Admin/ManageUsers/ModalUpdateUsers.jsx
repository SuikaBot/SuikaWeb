import axios from "axios";
import Swal from "sweetalert2";
import { ENDPOINTS } from "../../../utils/contants/endpoint";

import ModalCore from "../../General/Modals/ModalCore";
import InputText from "../../General/Modals/InputText";
import SwitchToggle from "../../General/DataTables/SwitchToggle";
import InputRadio from "../../General/Modals/InputRadio";

const ModalUpdateUsers = ({
  token,
  roles,
  open,
  setOpen,
  data,
  handleChange,
  render,
}) => {
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        ENDPOINTS.USERS_ID(data.admin_id),
        {
          name: data.name,
          email: data.email,
          username: data.username,
          password: data.password ? data.password : "",
          confPassword: data.confPassword ? data.confPassword : "",
          role: data.role,
          is_active: data.is_active,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      render();
      Swal.fire({
        title: "Success Update Data",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Failed Update Data",
        text: `${error.response.data.msg}`,
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
    // closeModal();
  };

  return (
    <>
      {open && data && (
        <ModalCore
          title={"Update User"}
          btnTitle={"Update"}
          formSubmit={updateUser}
          openModal={open}
          actClose={() => setOpen(false)}
        >
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-10 gap-3">
            <InputText
              name={"name"}
              title={"Name"}
              type={"text"}
              value={data.name}
              inputChange={handleChange}
              placeholder={"Suika"}
            />
            <InputText
              name={"email"}
              title={"Email"}
              type={"email"}
              value={data.email}
              inputChange={handleChange}
              placeholder={"dev@suika.pw"}
            />
          </div>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-10 gap-3">
            <InputText
              name={"password"}
              title={"Password"}
              type={"password"}
              value={data.password}
              inputChange={handleChange}
              placeholder={"*****"}
            />
            <InputText
              name={"confPassword"}
              title={"Conf Password"}
              type={"password"}
              value={data.confPassword}
              inputChange={handleChange}
              placeholder={"*****"}
            />
          </div>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-10 gap-3">
            <InputText
              name={"username"}
              title={"Username"}
              type={"text"}
              value={data.username}
              inputChange={(e) => handleChange(e)}
              placeholder={"SuikaDev123"}
            />
            <div className="col-span-5">
              <label
                htmlFor={`hs-is-active`}
                className="block text-md font-medium mb-2 dark:text-color4"
              >
                Is Active
              </label>
              <SwitchToggle
                status={data.is_active}
                onChange={handleChange}
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
              {roles.map((role) => (
                <InputRadio
                  key={role.value}
                  name={"role"}
                  title={"Role"}
                  checked={data.role === role.value}
                  value={role.value}
                  inputChange={handleChange}
                  placeholder={role.name}
                />
              ))}
            </div>
          </div>
        </ModalCore>
      )}
    </>
  );
};

export default ModalUpdateUsers;
