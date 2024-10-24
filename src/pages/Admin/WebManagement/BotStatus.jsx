import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import axios from "axios";
import Swal from "sweetalert2";
import Layout from "../../../components/_Admin/Layout/Layout";
import { ENDPOINTS } from "../../../utils/contants/endpoint";

import SwitchToggle from "../../../components/General/DataTables/SwitchToggle";
import CustomHeader from "../../../components/General/DataTables/CustomHeader";
import DataTableMain from "../../../components/General/DataTables/DataTableMain";
import { useNavigate } from "react-router-dom";
import ActionsMenu from "../../../components/General/DataTables/ActionsMenu";
import { ListLoading } from "../../../components/General/Loading";
import BreadcrumbsMain from "../../../components/_Admin/Breadcrumbs/BreadcrumbsMain";
import { useSelector } from "react-redux";
import ModalAddBots from "../../../components/_Admin/ManageBots/ModalAddBots";
import ModalUpdateBots from "../../../components/_Admin/ManageBots/ModalUpdateBots";

const BotStatus = () => {
  const navigate = useNavigate();
  const token =
    useSelector((state) => state.data_user.access_token) ||
    localStorage.getItem("token");

  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState();

  const [bots, setBots] = useState([]);

  const [isActive, setIsActive] = useState(false);
  // const [activatedBot, setActivatedBot] = useState("");

  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

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
      const dataBot = response.data.data.suikaBotList;
      setBots(dataBot);

      // const initialIsActiveState = {};
      // dataBot.forEach((bot) => {
      //   initialIsActiveState[bot.bot_id] = bot.status;
      // });
      // setIsActive(initialIsActiveState);

      // const activeBotCount = dataBot.filter((bot) => bot.status).length;
      // setActivatedBot(activeBotCount);
    } catch (error) {
      if (error.response.status === 403) {
        navigate("/sb/login");
      }
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  const activateSuikaBot = async (e, bot) => {
    const { checked } = e.target;
    try {
      await axios.patch(
        ENDPOINTS.BOTS_ID(bot.bot_id),
        { status: checked },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsActive((prevState) => ({ ...prevState, [bot.bot_id]: checked }));

      // const activeBotCount =
      //   Object.values(updateState).filter(Boolean).length;
      // setActivatedBot(activeBotCount);

      // return updateState;

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

  const deleteSuikaBot = async (bot_id) => {
    try {
      const response = await axios.get(ENDPOINTS.BOTS_ID(bot_id));
      const number = response.data.data.bot_id;

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
        await axios.delete(ENDPOINTS.BOTS_ID(bot_id));

        getSuikaBotList();
        await Swal.fire({
          title: "Success Delete Bot",
          icon: "success",
          confirmButtonColor: "#3085d6",
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

  useEffect(() => {
    getSuikaBotList();
  }, [token, navigate]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const columns = [
    { name: "No", selector: (row, index) => index + 1 + ".", sortable: true },
    { name: "No. WhatsApp", selector: (row) => row.bot_id, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    {
      name: "Status",
      selector: (row) => (row.status ? true : false),
      cell: (row) => (
        <SwitchToggle
          status={
            isActive[row.bot_id] !== undefined
              ? isActive[row.bot_id]
              : row.status
          }
          onChange={(e) =>
            activateSuikaBot(e, {
              status: row.status,
              bot_id: row.bot_id,
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
          onDelete={() => deleteSuikaBot(row.bot_id)}
        />
      ),
    },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentItem((prevItem) => ({
      ...prevItem,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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
                <ModalAddBots
                  token={token}
                  open={openModal}
                  setOpen={() => setOpenModal(false)}
                  render={() => getSuikaBotList()}
                />

                {/* MODALS UPDATE */}
                <ModalUpdateBots
                  token={token}
                  open={editModal}
                  setOpen={() => setEditModal(false)}
                  data={currentItem}
                  handleChange={(e) => handleChange(e)}
                  render={() => getSuikaBotList()}
                />
              </>
            )}
          </div>,
        ]}
      </Layout>
    </>
  );
};

export default BotStatus;
