import React, { useState, Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { Menu, Transition } from "@headlessui/react";

import { faker } from "@faker-js/faker";

import Layout from "../../../components/_Admin/Layout/Layout";
import DataTableBase from "../../../components/General/DataTableBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const generateCustomData = (num) => {
  const data = [];
  for (let i = 0; i < num; i++) {
    data.push({
      id: i + 1,
      username: faker.internet.userName(),
      email: faker.internet.email(),
      isActive: faker.datatype.boolean(),
    });
  }
  return data;
};

// Definisi kolom untuk DataTable
const columns = [
  { name: "ID", selector: (row) => row.id, sortable: true },
  { name: "Username", selector: (row) => row.username, sortable: true },
  { name: "Email", selector: (row) => row.email, sortable: true },
  {
    name: "Active",
    selector: (row) => (row.isActive ? "Yes" : "No"),
    sortable: true,
  },
  {
    name: "Actions",
    cell: (row) => (
      <Menu as="div" className="relative">
        <Menu.Button className="p-2 text-gray-500 hover:text-gray-700">
          <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items className="shador-xl absolute right-0 w-32 origin-top-right z-10 bg-color1 divide-y divide-gray-100 rounded-md shadow-lg ring-2 ring-color4 ring-opacity-5 focus:outline-none px-2 py-1">
            <div className="p-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleEdit(row.id)}
                    className={`${
                      active
                        ? "bg-warning-hover text-color4"
                        : "bg-warning text-color4"
                    } group flex rounded-md items-center w-full p-2 text-sm mb-1`}
                  >
                    <span className="mr-2">
                      <FontAwesomeIcon icon="fa-regular fa-pen-to-square" />
                    </span>
                    Edit
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleDelete(row.id)}
                    className={`${
                      active
                        ? "bg-danger-hover text-color1"
                        : "bg-danger text-color1"
                    } group flex rounded-md items-center w-full p-2 text-sm`}
                  >
                    <span className="mr-2">
                      <FontAwesomeIcon icon="fa-regular fa-trash-can" />
                    </span>
                    Delete{" "}
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    ),
  },
];

// Komponen header dengan tombol tambah data
const CustomHeader = ({ onAddData }) => (
  <div className="flex items-center justify-between mb-4 p-4 border-b border-gray-200 bg-gray-50">
    <div>
      <h2 className="text-xl font-semibold">Status Bot</h2>
      <p>Buat ditampilin di bagian nomor bot.</p>
    </div>
    <button
      onClick={onAddData}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      Add Data
    </button>
  </div>
);

const BotStatus = () => {
  const [data, setData] = useState(generateCustomData(60));
  const [searchText, setSearchText] = useState("");

  // Fungsi untuk menambahkan data baru
  const addData = () => {
    setData((prevData) => [
      ...prevData,
      {
        id: prevData.length + 1,
        username: faker.internet.userName(),
        email: faker.internet.email(),
        isActive: faker.datatype.boolean(),
      },
    ]);
  };

  // Fungsi untuk menangani perubahan teks pencarian
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  // Filter data berdasarkan teks pencarian
  const filteredData = data.filter((item) => {
    return (
      item.username.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email.toLowerCase().includes(searchText.toLowerCase())
    );
  });
  return (
    <>
      <Helmet>
        <title>Dashboard | SuikaBot</title>
      </Helmet>

      <Layout bg={"bg-color1"}>
        {[<div key={1}></div>]}

        {[
          <div key={2}>
            <div className="container mx-auto p-4">
              <CustomHeader onAddData={addData} />
              <div className="mb-4 flex flex-col sm:flex-row justify-between">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchText}
                  onChange={handleSearch}
                  className="w-2/4 sm:w-full md:w-2/5 lg:w-2/5 xl:w-1/5  p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="overflow-x-auto">
                <DataTableBase
                  columns={columns}
                  data={filteredData}
                  pagination
                  highlightOnHover
                  pointerOnHover
                  responsive
                  fixedHeader
                  fixedHeaderScrollHeight="500px"
                />
              </div>
            </div>
          </div>,
        ]}
      </Layout>
    </>
  );
};

export default BotStatus;
