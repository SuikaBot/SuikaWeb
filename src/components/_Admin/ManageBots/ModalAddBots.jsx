import { useState } from "react";
import ModalCore from "../../General/Modals/ModalCore";
import InputText from "../../General/Modals/InputText";
import SwitchToggle from "../../General/DataTables/SwitchToggle";
import Swal from "sweetalert2";
import axios from "axios";
import { ENDPOINTS } from "../../../utils/contants/endpoint";

const ModalAddBots = ({ token, open, setOpen, render }) => {
  const [bot_id, setBot_id] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState(false);
  const [reason, setReason] = useState("");
  const [version, setVersion] = useState("");

  const addSuikaBot = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        ENDPOINTS.BOTS,
        {
          bot_id: bot_id,
          name: name,
          status: status,
          reason: reason || null,
          version: version,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      render();
      Swal.fire({
        title: "Success Add SuikaBot",
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
      title={"Add New SuikaBot"}
      btnTitle={"Save"}
      formSubmit={addSuikaBot}
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
          name={"bot_id"}
          title={"No. WhatsApp"}
          type={"text"}
          value={bot_id}
          inputChange={(e) => setBot_id(e.target.value)}
          placeholder={"0896xxxxxx"}
        />
      </div>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-10 gap-3">
        <InputText
          name={"version"}
          title={"Version"}
          type={"text"}
          value={version}
          inputChange={(e) => setVersion(e.target.value)}
          placeholder={"v1.x"}
        />
        <InputText
          name={"reason"}
          title={"Reason"}
          type={"text"}
          value={reason}
          inputChange={(e) => setReason(e.target.value)}
          placeholder={"Banned"}
        />
      </div>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-10 gap-3">
        <div className="col-span-5">
          <label
            htmlFor={`hs-is-active`}
            className="block text-md font-medium mb-2"
          >
            Status
          </label>
          <SwitchToggle
            status={status}
            onChange={(e) => {
              setStatus(e.target.checked);
            }}
            name={"status"}
          />
        </div>
      </div>
    </ModalCore>
  );
};

export default ModalAddBots;
