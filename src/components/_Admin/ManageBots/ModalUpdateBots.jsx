import axios from "axios";
import Swal from "sweetalert2";
import { ENDPOINTS } from "../../../utils/contants/endpoint";

import ModalCore from "../../General/Modals/ModalCore";
import InputText from "../../General/Modals/InputText";
import SwitchToggle from "../../General/DataTables/SwitchToggle";

const ModalUpdateBots = ({
  token,
  open,
  setOpen,
  data,
  handleChange,
  render,
}) => {
  const updateSuikaBot = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        ENDPOINTS.BOTS_ID(data.bot_id),
        {
          bot_id: data.bot_id,
          name: data.name,
          status: data.status,
          reason: data.reason || null,
          version: data.version,
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
          title: "Failed Update Data",
          html: `<ul>${formattedErrors}</ul>`,
          icon: "error",
          confirmButtonColor: "#d33",
        });
      } else {
        Swal.fire({
          title: "Failed Update Data",
          text: `${error.response.data.message}`,
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    }
    // closeModal();
  };
  return (
    <>
      {open && data && (
        <ModalCore
          title={"Update SuikaBot"}
          btnTitle={"Update"}
          formSubmit={updateSuikaBot}
          openModal={open}
          actClose={() => setOpen(false)}
        >
          <div className="mt-10 grid grid-cols-10 gap-3">
            <InputText
              name={"name"}
              title={"Name"}
              type={"text"}
              value={data.name}
              inputChange={handleChange}
              placeholder={"Suika"}
            />
            <InputText
              name={"no_wa"}
              title={"No. WhatsApp"}
              type={"text"}
              value={data.no_wa}
              inputChange={handleChange}
              placeholder={"0986xxxxxxx"}
            />
          </div>
          <div className="mt-3 grid grid-cols-10 gap-3">
            <InputText
              name={"reason"}
              title={"Reason"}
              type={"text"}
              value={data.reason || ""}
              inputChange={handleChange}
              placeholder={"ex: banned"}
            />
            <InputText
              name={"version"}
              title={"Version"}
              type={"text"}
              value={data.version}
              inputChange={handleChange}
              placeholder={"v1.x"}
            />
          </div>
          <div className="mt-3 grid grid-cols-10 gap-3">
            <div className="col-span-5">
              <label
                htmlFor={`hs-is-active`}
                className="block text-md font-medium mb-2 dark:text-color4"
              >
                Status
              </label>
              <SwitchToggle
                status={data.status}
                onChange={handleChange}
                name={"status"}
              />
            </div>
          </div>
        </ModalCore>
      )}
    </>
  );
};

export default ModalUpdateBots;
