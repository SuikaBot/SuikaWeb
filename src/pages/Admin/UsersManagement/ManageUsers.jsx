import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "../../../components/_Admin/Layout/Layout";
import ActionsMenu from "../../../components/General/DataTables/ActionsMenu";
import CustomHeader from "../../../components/General/DataTables/CustomHeader";
import DataTableMain from "../../../components/General/DataTables/DataTableMain";
import axios from "axios";
import { ENDPOINTS } from "../../../utils/contants/endpoint";
import SwitchToggle from "../../../components/General/DataTables/SwitchToggle";
import ModalCore from "../../../components/General/Modals/ModalCore";
import Swal from "sweetalert2";
import InputText from "../../../components/General/Modals/InputText";
import InputRadio from "../../../components/General/Modals/InputRadio";
import { useNavigate } from "react-router-dom";
import DashBox from "../../../components/_Admin/DashBox/DashBox";

const ManageUsers = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("user_data")).access_token;

  const [openModal, setOpenModal] = useState(false);

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState();
  const [isActive, setIsActive] = useState(false);
  const [activatedUser, setActivatedUser] = useState("");

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
        // navigate(0);
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

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        ENDPOINTS.USERS_ID(currentItem.uuid),
        {
          name: currentItem.name,
          email: currentItem.email,
          password: currentItem.password ? currentItem.password : "",
          confPassword: currentItem.confPassword
            ? currentItem.confPassword
            : "",
          role: currentItem.role,
          is_active: currentItem.is_active,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        title: "Success Update Data",
        icon: "success",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        // navigate(0);
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

  const activateUser = async (e, user) => {
    const { checked } = e.target;

    try {
      await axios.patch(
        ENDPOINTS.USERS_ID(user.uuid),
        { is_active: checked },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsActive((prevState) => {
        const updatedState = { ...prevState, [user.uuid]: checked };

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
      const userName = response.data.name;

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

        await Swal.fire({
          title: "Success Delete User",
          icon: "success",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          // navigate(0);
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentItem((prevItem) => ({
      ...prevItem,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
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
          initialIsActiveState[user.uuid] = user.is_active;
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

    getDataUsers();
  }, [token, navigate]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const columns = [
    { name: "No", selector: (row, index) => index + 1 + ".", sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Role", selector: (row) => row.role, sortable: true },
    {
      name: "Activated User",
      selector: (row) => (row.is_active ? true : false),
      cell: (row) => (
        <SwitchToggle
          status={
            isActive[row.uuid] !== undefined
              ? isActive[row.uuid]
              : row.is_active
          }
          onChange={(e) =>
            activateUser(e, {
              is_active: row.is_active,
              uuid: row.uuid,
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
          onDelete={() => deleteUser(row.uuid)}
        />
      ),
    },
  ];

  const roles = [
    { value: "admin", name: "Admin" },
    { value: "user", name: "User" },
  ];

  return (
    <>
      <Helmet>
        <title>Manage Users | SuikaBot</title>
      </Helmet>
      <Layout bg={"bg-color1"}>
        {[
          <div key={1}>
            <div className="container mx-auto">
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
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
            {loading === true ? (
              "loading..."
            ) : (
              <>
                <div className="container p-4">
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
                <ModalCore
                  title={"Add New User"}
                  btnTitle={"Save"}
                  formSubmit={addUser}
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

                {/* MODALS UPDATE */}
                {editModal && currentItem && (
                  <ModalCore
                    title={"Update User"}
                    btnTitle={"Update"}
                    formSubmit={updateUser}
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
                        name={"email"}
                        title={"Email"}
                        type={"email"}
                        value={currentItem.email}
                        inputChange={handleChange}
                        placeholder={"dev@suika.pw"}
                      />
                    </div>
                    <div className="mt-3 grid grid-cols-10 gap-3">
                      <InputText
                        name={"password"}
                        title={"Password"}
                        type={"password"}
                        value={currentItem.password}
                        inputChange={handleChange}
                        placeholder={"*****"}
                      />
                      <InputText
                        name={"confPassword"}
                        title={"Conf Password"}
                        type={"password"}
                        value={currentItem.confPassword}
                        inputChange={handleChange}
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
                            name={"role"}
                            title={"Role"}
                            checked={currentItem.role === data.value}
                            value={data.value}
                            inputChange={handleChange}
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
                          status={currentItem.is_active}
                          onChange={handleChange}
                          name={"is_active"}
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

export default ManageUsers;
