import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Label from "./Label";

import { dashboardNav } from "../../../utils/contants/navigation";
import SidebarToggle from "../../../utils/hooks/SidebarToggle";

const Sidebar = () => {
  SidebarToggle();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const savedDropdown = localStorage.getItem("activeDropdown");
    if (savedDropdown) {
      setActiveDropdown(savedDropdown);
    }
  }, []);

  const toggleDropdown = (menuName) => {
    const currentDropdown = localStorage.getItem("activeDropdown");
    const newDropdown = currentDropdown === menuName ? null : menuName;
    localStorage.setItem("activeDropdown", newDropdown);
    setActiveDropdown(newDropdown);
  };

  const deleteDropdown = () => {
    localStorage.removeItem("activeDropdown");
  };

  const isSubMenuActive = (subMenu) => {
    return subMenu.some((item) => location.pathname === item.path);
  };

  return (
    <>
      <aside
        id="sidebar"
        className="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 hidden w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width"
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
            <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              <ul className="pb-2 space-y-2 ml-1 sm:ml-3">
                <li>
                  <form action="#" method="GET" className="lg:hidden">
                    <label htmlFor="mobile-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="email"
                        id="mobile-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Search"
                      />
                    </div>
                  </form>
                </li>

                {dashboardNav.map((section) => (
                  <React.Fragment key={section.label}>
                    <Label name={section.label} />
                    {section.items.map((menu) =>
                      menu.sub_menu ? (
                        <li key={menu.name} className="">
                          <button
                            type="button"
                            className={`shadow-md flex items-center w-full px-3 py-4 text-md transition duration-75 rounded-lg group ${
                              isSubMenuActive(menu.sub_menu)
                                ? "text-gray-900 dark:text-gray-200 bg-color1 dark:bg-gray-700 font-semibold"
                                : "text-gray-900 dark:text-gray-200 bg-neutral-100 hover:bg-color1 dark:hover:bg-gray-700"
                            }
                              `}
                            onClick={() => toggleDropdown(menu.name)}
                            aria-controls={`dropdown-${menu.name}`}
                          >
                            <FontAwesomeIcon
                              className="flex-shrink-0 transition duration-75"
                              icon={menu.icon}
                            />
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">
                              {menu.name}
                            </span>
                            <FontAwesomeIcon
                              className={`ms-auto block size-4 ${
                                activeDropdown === menu.name ? "rotate-180" : ""
                              }`}
                              icon="fa-solid fa-angle-down"
                            />
                          </button>
                          <ul
                            id={`dropdown-${menu.name}`}
                            className={`py-2 space-y-2 ${
                              activeDropdown === menu.name ? "block" : "hidden"
                            }`}
                          >
                            {menu.sub_menu.map((subMenu) => (
                              <li key={subMenu.name}>
                                <NavLink
                                  className={({ isActive }) =>
                                    `shadow-md text-sm flex items-center py-2 ml-5 text-base transition duration-75 rounded-lg px-4 group ${
                                      isActive
                                        ? "text-gray-900 bg-color1 dark:text-gray-200 dark:bg-gray-700 font-semibold"
                                        : "text-gray-900 bg-neutral-100 hover:bg-color1 dark:text-gray-200 dark:hover:bg-gray-700"
                                    }`
                                  }
                                  to={subMenu.path}
                                >
                                  <FontAwesomeIcon
                                    icon={subMenu.icon}
                                    size="xs"
                                    className="mr-2"
                                  />
                                  {subMenu.name}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ) : (
                        <li key={menu.name}>
                          <NavLink
                            onClick={() => deleteDropdown()}
                            to={menu.path}
                            className={({ isActive }) =>
                              `shadow-md flex items-center px-3 py-4 text-md rounded-lg group ${
                                isActive
                                  ? "text-gray-900 dark:text-gray-200 bg-color1 dark:bg-gray-700 font-semibold"
                                  : "text-gray-900 dark:text-gray-200 bg-neutral-100 hover:bg-color1 dark:hover:bg-gray-700"
                              }`
                            }
                          >
                            <FontAwesomeIcon
                              className="transition duration-75"
                              icon={menu.icon}
                            />
                            <span className="ml-3">{menu.name}</span>
                          </NavLink>
                        </li>
                      )
                    )}
                  </React.Fragment>
                ))}
              </ul>
              {/* <div className="pt-2 space-y-2">
                <a
                  href="https://github.com/themesberg/flowbite-admin-dashboard"
                  target="_blank"
                  className="flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                  >
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                  </svg>
                  <span className="ml-3">GitHub Repository</span>
                </a>
              </div> */}
            </div>
          </div>

          <div>
            <hr className="border-t border-gray-200 dark:border-gray-700 mx-3" />

            <div className="bottom-0 left-0 justify-center w-full p-4 space-x-4 bg-white flex dark:bg-gray-800 ">
              {/* <a
              href="#"
              className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
              </svg>
            </a>
            <a
              href="#"
              data-tooltip-target="tooltip-settings"
              className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
            <div
              id="tooltip-settings"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
              Settings page
              <div className="tooltip-arrow" data-popper-arrow></div>
              </div> */}

              <div data-tooltip-target="tooltip-settings">
                <NavLink
                  onClick={() => deleteDropdown()}
                  to={"/"}
                  className={({ isActive }) =>
                    `shadow-md items-center px-3 py-2 text-md rounded-lg group ${
                      isActive
                        ? "text-gray-900 dark:text-gray-200 bg-color1 dark:bg-gray-700 font-semibold"
                        : "text-gray-900 dark:text-gray-200 bg-neutral-100 hover:bg-color1 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  <FontAwesomeIcon
                    className="transition duration-75"
                    size="sm"
                    icon={" fa-solid fa-home"}
                  />
                  {/* <span className="ml-3">{"Landingpage"}</span> */}
                </NavLink>
                <div
                  id="tooltip-settings"
                  role="tooltip"
                  className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                >
                  Home
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div
        className="fixed inset-0 z-10 hidden bg-gray-900/50 dark:bg-gray-900/90"
        id="sidebarBackdrop"
      ></div>
    </>
  );
};

export default Sidebar;
