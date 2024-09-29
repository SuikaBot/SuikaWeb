import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import Layout from "../../../components/_Admin/Layout/Layout";
import Swal from "sweetalert2";
import axios from "axios";
import { ENDPOINTS } from "../../../utils/contants/endpoint";
import SwitchToggle from "../../../components/General/DataTables/SwitchToggle";
import CustomHeader from "../../../components/General/DataTables/CustomHeader";
import DataTableMain from "../../../components/General/DataTables/DataTableMain";
import ModalCore from "../../../components/General/Modals/ModalCore";
import InputText from "../../../components/General/Modals/InputText";
import { useNavigate } from "react-router-dom";
import ActionsMenu from "../../../components/General/DataTables/ActionsMenu";
import { ListLoading } from "../../../components/General/Loading";
import BreadcrumbsMain from "../../../components/_Admin/Breadcrumbs/BreadcrumbsMain";

const BotStatus = () => {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const [bots, setBots] = useState([]);
  const [name, setName] = useState("");
  const [no_wa, setNo_wa] = useState("");
  const [status, setStatus] = useState(false);
  // const [reason, setReason] = useState("");
  const [version, setVersion] = useState("");

  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const openEditModal = (item) => {
    setCurrentItem({ ...item });
    setEditModal(true);
  };

  const getSuikaBotList = async () => {
    try {
      const response = await axios.get(ENDPOINTS.BOTS);
      setBots(response.data.data.suikaBotList);
    } catch (error) {
      if (error.response.status === 403) {
        navigate("/sb/login");
      }
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  const addSuikaBot = async (e) => {
    e.preventDefault();
    try {
      await axios.post(ENDPOINTS.BOTS, {
        name: name,
        no_wa: no_wa,
        status: status,
        version: version,
      });

      Swal.fire({
        title: "Success Add SuikaBot",
        icon: "success",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate(0);
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

  const updateSuikaBot = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(ENDPOINTS.BOTS_ID(currentItem.id), {
        name: currentItem.name,
        no_wa: currentItem.no_wa,
        status: currentItem.status,
        reason: currentItem.reason || "-",
        version: currentItem.version,
      });

      Swal.fire({
        title: "Success Update Data",
        icon: "success",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate(0);
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

  const activateSuikaBot = async (e, bot) => {
    const { checked } = e.target;

    try {
      await axios.patch(ENDPOINTS.BOTS_ID(bot.id), { status: checked });
      setStatus((prevState) => ({ ...prevState, [bot.id]: checked }));
      Toast.fire({
        icon: checked ? "success" : "warning",
        title: `${bot.name} is ${checked ? "activated" : "deactivated"}`,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Failed Update Data",
        text: `${error.response?.data?.msg || "An error occurred"}`,
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  const deleteSuikaBot = async (id) => {
    try {
      const response = await axios.get(ENDPOINTS.BOTS_ID(id));
      const number = response.data.no_wa;

      const result = await Swal.fire({
        title: "Sure?",
        html: `Deleted SuikaBot with number "${number}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#a3a5a6",
        confirmButtonText: "Sure, delete!",
      });
      if (result.isConfirmed) {
        await axios.delete(ENDPOINTS.BOTS_ID(id));

        await Swal.fire({
          title: "Success Delete Bot",
          icon: "success",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          navigate(0);
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Failed Delete Data",
        text: "An error occurred",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentItem((prevItem) => ({
      ...prevItem,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    getSuikaBotList();
  }, []);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const columns = [
    { name: "No", selector: (row, index) => index + 1 + ".", sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "No. WhatsApp", selector: (row) => row.no_wa, sortable: true },
    {
      name: "Status",
      selector: (row) => (row.status ? true : false),
      cell: (row) => (
        <SwitchToggle
          status={status[row.id] !== undefined ? status[row.id] : row.status}
          onChange={(e) =>
            activateSuikaBot(e, {
              status: row.status,
              id: row.id,
              name: row.name,
            })
          }
          name={"status"}
        />
      ),
      sortable: true,
    },
    { name: "Reason", selector: (row) => row.reason || "-", sortable: true },
    { name: "Version", selector: (row) => row.version, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <ActionsMenu
          onEdit={() => openEditModal(row)}
          onDelete={() => deleteSuikaBot(row.id)}
        />
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Manage SuikaBot | SuikaBot</title>
      </Helmet>

      <Layout bg={"bg-color1"}>
        {[<div key={1}></div>]}

        {[
          <div key={2}>
            <BreadcrumbsMain />
            {loading === true ? (
              <div className="container mx-auto p-4">
                <CustomHeader
                  title="Manage SuikaBots"
                  description="Manage suikabot whatsapp data here"
                  buttonText="+ Add SuikaBot"
                  onButtonClick={() => setOpenModal(true)}
                  overlay={"add-bots-modal"}
                />
                <ListLoading />
              </div>
            ) : (
              <>
                <div className="container mx-auto p-4">
                  <CustomHeader
                    title="Manage SuikaBots"
                    description="Manage suikabot whatsapp data here"
                    buttonText="+ Add SuikaBot"
                    onButtonClick={() => setOpenModal(true)}
                    overlay={"add-bots-modal"}
                  />
                  <DataTableMain
                    columns={columns}
                    data={bots}
                    searchText={searchText}
                    onSearch={handleSearch}
                  />
                </div>

                {/* MODALS ADD */}
                <ModalCore
                  title={"Add New SuikaBot"}
                  btnTitle={"Save"}
                  formSubmit={addSuikaBot}
                  openModal={openModal}
                  actClose={() => setOpenModal(false)}
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
                      name={"no_wa"}
                      title={"No. WhatsApp"}
                      type={"text"}
                      value={no_wa}
                      inputChange={(e) => setNo_wa(e.target.value)}
                      placeholder={"0896xxxxxx"}
                    />
                  </div>
                  <div className="mt-10 grid grid-cols-10 gap-3">
                    <InputText
                      name={"version"}
                      title={"Version"}
                      type={"text"}
                      value={version}
                      inputChange={(e) => setVersion(e.target.value)}
                      placeholder={"v1.x"}
                    />
                    <div className="col-span-5">
                      <label
                        htmlFor={`hs-is-active`}
                        className="block text-md font-medium mb-2 dark:text-color4"
                      >
                        Status
                      </label>
                      <SwitchToggle
                        status={status}
                        onChange={(e) => {
                          setStatus(e.target.checked);
                        }}
                      />
                    </div>
                  </div>
                </ModalCore>

                {/* MODALS UPDATE */}
                {editModal && currentItem && (
                  <ModalCore
                    title={"Update SuikaBot"}
                    btnTitle={"Update"}
                    formSubmit={updateSuikaBot}
                    openModal={editModal}
                    actClose={() => setEditModal(false)}
                  >
                    <div className="mt-10 grid grid-cols-10 gap-3">
                      <InputText
                        name={"name"}
                        title={"Name"}
                        type={"text"}
                        value={currentItem.name}
                        inputChange={handleChange}
                        placeholder={"Suika"}
                      />
                      <InputText
                        name={"no_wa"}
                        title={"No. WhatsApp"}
                        type={"text"}
                        value={currentItem.no_wa}
                        inputChange={handleChange}
                        placeholder={"0986xxxxxxx"}
                      />
                    </div>
                    <div className="mt-3 grid grid-cols-10 gap-3">
                      <InputText
                        name={"reason"}
                        title={"Reason"}
                        type={"text"}
                        value={currentItem.reason || ""}
                        inputChange={handleChange}
                        placeholder={"ex: banned"}
                      />
                      <InputText
                        name={"version"}
                        title={"Version"}
                        type={"text"}
                        value={currentItem.version}
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
                          status={currentItem.status}
                          onChange={handleChange}
                          name={"status"}
                        />
                      </div>
                    </div>
                  </ModalCore>
                )}
              </>
            )}
          </div>,
        ]}
      </Layout>
    </>
  );
};

export default BotStatus;
