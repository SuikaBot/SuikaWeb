import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import axios from "axios";
import Swal from "sweetalert2";
import Layout from "../../../components/_Admin/Layout/Layout";
import { ENDPOINTS } from "../../../utils/contants/endpoint";

import ActionsMenu from "../../../components/General/DataTables/ActionsMenu";
import CustomHeader from "../../../components/General/DataTables/CustomHeader";
import DataTableMain from "../../../components/General/DataTables/DataTableMain";
import SwitchToggle from "../../../components/General/DataTables/SwitchToggle";
import DashBox from "../../../components/_Admin/DashBox/DashBox";
import { ListLoading } from "../../../components/General/Loading";
import ModalAddUsers from "../../../components/_Admin/ManageUsers/ModalAddUsers";
import ModalUpdateUsers from "../../../components/_Admin/ManageUsers/ModalUpdateUsers";
import BreadcrumbsMain from "../../../components/_Admin/Breadcrumbs/BreadcrumbsMain";

const ManageUsers = () => {
  const navigate = useNavigate();
  const token =
    useSelector((state) => state.data_user.access_token) ||
    localStorage.getItem("token");

  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState();

  const [users, setUsers] = useState([]);

  const [isActive, setIsActive] = useState(false);
  const [activatedUser, setActivatedUser] = useState("");

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

  const getDataUsers = async () => {
    try {
      const response = await axios.get(ENDPOINTS.USERS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const usersData = response.data.data;
      setUsers(usersData);

      const initialIsActiveState = {};
      usersData.forEach((user) => {
        initialIsActiveState[user.admin_id] = user.is_active;
      });
      setIsActive(initialIsActiveState);

      const activeUsersCount = usersData.filter(
        (user) => user.is_active
      ).length;
      setActivatedUser(activeUsersCount);
    } catch (error) {
      console.log(error);
      if (error.response.status === 403) {
        localStorage.removeItem("user_data");
        navigate("/sb/login");
      }
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  const activateUser = async (e, user) => {
    const { checked } = e.target;

    try {
      await axios.patch(
        ENDPOINTS.USERS_ID(user.admin_id),
        { is_active: checked },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsActive((prevState) => {
        const updatedState = { ...prevState, [user.admin_id]: checked };

        const activeUsersCount =
          Object.values(updatedState).filter(Boolean).length;
        setActivatedUser(activeUsersCount);

        return updatedState;
      });

      Toast.fire({
        icon: checked ? "success" : "warning",
        title: `${user.name} is ${checked ? "activated" : "deactivated"}`,
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

  const deleteUser = async (id) => {
    try {
      const response = await axios.get(ENDPOINTS.USERS_ID(id), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userName = response.data.data.username;

      const result = await Swal.fire({
        title: "Sure?",
        html: `Deleted this user "${userName}"`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#a3a5a6",
        confirmButtonText: "Sure, delete!",
      });
      if (result.isConfirmed) {
        await axios.delete(ENDPOINTS.USERS_ID(id), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        getDataUsers();
        await Swal.fire({
          title: "Success Delete User",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Failed Delete Data",
        text: `${error.response.data.msg}`,
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  useEffect(() => {
    getDataUsers();
  }, [token, navigate]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const columns = [
    { name: "No", selector: (row, index) => index + 1 + ".", sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Username", selector: (row) => row.username, sortable: true },
    { name: "Role", selector: (row) => row.role, sortable: true },
    {
      name: "Activated User",
      selector: (row) => (row.is_active ? true : false),
      cell: (row) => (
        <SwitchToggle
          status={
            isActive[row.admin_id] !== undefined
              ? isActive[row.admin_id]
              : row.is_active
          }
          onChange={(e) =>
            activateUser(e, {
              is_active: row.is_active,
              admin_id: row.admin_id,
              name: row.name,
            })
          }
          name={"is_active"}
        />
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <ActionsMenu
          onEdit={() => openEditModal(row)}
          onDelete={() => deleteUser(row.admin_id)}
        />
      ),
    },
  ];

  const roles = [
    { value: "admin", name: "Admin" },
    { value: "user", name: "User" },
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
        <title>Manage Users | SuikaBot</title>
      </Helmet>
      <Layout bg={"bg-color1"}>
        {[
          <div key={1}>
            <BreadcrumbsMain />
            <div className="mx-auto">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <DashBox
                  name={"Total Users"}
                  hidden={"hidden"}
                  value={users.length}
                  icon={"fa-solid fa-users"}
                />
                <DashBox
                  name={"Users Activated"}
                  hidden={"hidden"}
                  value={activatedUser}
                  icon={"fa-solid fa-user-check"}
                />
              </div>
            </div>
          </div>,
        ]}
        {[
          <div key={2}>
            <BreadcrumbsMain />
            {loading ? (
              <div className="container mx-auto p-4">
                <CustomHeader
                  title="Manage Users"
                  description="Manage users data here"
                  buttonText="+ Add Users"
                  onButtonClick={() => setOpenModal(true)}
                  overlay={"add-user-modal"}
                />
                <ListLoading />
              </div>
            ) : (
              <>
                <div className="container mx-auto p-4">
                  <CustomHeader
                    title="Manage Users"
                    description="Manage users data here"
                    buttonText="+ Add Users"
                    onButtonClick={() => setOpenModal(true)}
                    overlay={"add-user-modal"}
                  />
                  <DataTableMain
                    columns={columns}
                    data={users}
                    searchText={searchText}
                    onSearch={handleSearch}
                  />
                </div>

                {/* MODALS ADD */}
                <ModalAddUsers
                  token={token}
                  roles={roles}
                  open={openModal}
                  setOpen={() => setOpenModal(false)}
                  render={() => getDataUsers()}
                />

                {/* MODALS UPDATE */}
                <ModalUpdateUsers
                  token={token}
                  roles={roles}
                  open={editModal}
                  setOpen={() => setEditModal(false)}
                  data={currentItem}
                  handleChange={(e) => handleChange(e)}
                  render={() => getDataUsers()}
                />
              </>
            )}
          </div>,
        ]}
      </Layout>
    </>
  );
};

export default ManageUsers;
