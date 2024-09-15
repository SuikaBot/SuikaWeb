import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import dashboardNav from "../../../utils/contants/navigation";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setQuery(searchTerm);

    if (searchTerm) {
      const filteredResults = [];

      dashboardNav.forEach((section) => {
        section.items.forEach((item) => {
          if (item.name.toLowerCase().includes(searchTerm)) {
            filteredResults.push({ ...item, sectionLabel: section.label });
          }
          if (item.sub_menu) {
            item.sub_menu.forEach((subItem) => {
              if (subItem.name.toLowerCase().includes(searchTerm)) {
                filteredResults.push({
                  ...subItem,
                  sectionLabel: section.label,
                  isSubMenu: true,
                });
              }
            });
          }
        });
      });

      setResults(filteredResults);
    } else {
      setResults([]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Cek apakah tombol yang ditekan adalah '/' dan apakah tombol meta (Windows) ditekan
      if (event.key === "/" && event.metaKey) {
        event.preventDefault(); // Mencegah aksi default dari kombinasi tombol
        const inputElement = document.getElementById("myInput");
        if (inputElement) {
          inputElement.focus(); // Fokus pada input
        }
      }
    };

    // Menambahkan event listener untuk keydown
    window.addEventListener("keydown", handleKeyDown);

    // Membersihkan event listener ketika komponen di-unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      {/* Mobile Search Button */}
      <button
        type="button"
        className="md:hidden size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-400 disabled:opacity-50 disabled:pointer-events-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FontAwesomeIcon
          className="shrink-0 size-4"
          icon="fa-solid fa-magnifying-glass"
        />
        <span className="sr-only">Search</span>
      </button>

      {/* Mobile Search Input */}
      {isOpen && (
        <div className="md:hidden relative mt-2">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
              <FontAwesomeIcon
                className="text-gray-400"
                icon="fa-solid fa-magnifying-glass"
              />
            </div>
            <input
              type="text"
              id="myInput"
              className="py-2 ps-10 pe-16 block w-full bg-white border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              placeholder="Search"
              value={query}
              onChange={handleSearch}
            />
            <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-1">
              <button
                type="button"
                className="inline-flex shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
                aria-label="Close"
                onClick={() => {
                  setQuery("");
                  setResults([]);
                  setIsOpen(false);
                }}
              >
                <span className="sr-only">Close</span>
                <FontAwesomeIcon
                  className="shrink-0 size-4"
                  icon="fa-regular fa-circle-xmark"
                />
              </button>
            </div>
          </div>
          {/* Mobile Results */}
          {results.length > 0 && (
            <div className="absolute bg-white border border-gray-200 rounded-lg mt-2 w-full max-h-80 overflow-y-auto z-30">
              {results.map((result, index) => (
                <div key={index}>
                  {/* Show section label above the results */}
                  {index === 0 ||
                  results[index - 1].sectionLabel !== result.sectionLabel ? (
                    <div className="px-4 py-2 bg-gray-100 text-gray-800 font-semibold">
                      {result.sectionLabel}
                    </div>
                  ) : null}
                  {result.path === "#" ? (
                    <div
                      className={`block px-4 py-2 text-sm text-gray-700 ${
                        result.isSubMenu ? "pl-8" : ""
                      }`}
                    >
                      <FontAwesomeIcon className="mr-2" icon={result.icon} />
                      {result.name}
                    </div>
                  ) : (
                    <NavLink
                      to={result.path}
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                        result.isSubMenu ? "pl-8" : ""
                      }`}
                    >
                      <FontAwesomeIcon className="mr-2" icon={result.icon} />
                      {result.name}
                    </NavLink>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Desktop Search Input */}
      <div className="hidden md:block">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
            <FontAwesomeIcon
              className="text-gray-400"
              icon="fa-solid fa-magnifying-glass"
            />
          </div>
          <input
            type="text"
            id="myInput"
            className="py-2 ps-10 pe-16 block w-full bg-white border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
            placeholder="Search"
            value={query}
            onChange={handleSearch}
          />
          <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-1">
            <button
              type="button"
              className="inline-flex shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
              aria-label="Close"
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
            >
              <span className="sr-only">Close</span>
              <FontAwesomeIcon
                className="shrink-0 size-4"
                icon="fa-regular fa-circle-xmark"
              />
            </button>
          </div>
          <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-3 text-gray-400">
            <FontAwesomeIcon
              className="shrink-0 size-3 text-gray-400"
              icon="fa-brands fa-windows"
            />
            <span className="mx-1">
              <FontAwesomeIcon
                className="shrink-0 size-3 text-gray-400"
                icon="fa-solid fa-plus"
              />
            </span>
            <span className="text-xs">/</span>
          </div>
        </div>
        {results.length > 0 && (
          <div className="absolute bg-white border border-gray-200 rounded-lg mt-2 w-96 max-h-80 overflow-y-auto z-30">
            {results.map((result, index) => (
              <div key={index}>
                {/* Show section label above the results */}
                {index === 0 ||
                results[index - 1].sectionLabel !== result.sectionLabel ? (
                  <div className="px-4 py-2 bg-gray-100 text-gray-800 font-semibold">
                    {result.sectionLabel}
                  </div>
                ) : null}
                {result.path === "#" ? (
                  <div
                    className={`block px-4 py-2 text-sm text-gray-700 ${
                      result.isSubMenu ? "pl-8" : ""
                    }`}
                  >
                    <FontAwesomeIcon className="mr-2" icon={result.icon} />
                    {result.name}
                  </div>
                ) : (
                  <NavLink
                    to={result.path}
                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                      result.isSubMenu ? "pl-8" : ""
                    }`}
                  >
                    <FontAwesomeIcon className="mr-2" icon={result.icon} />
                    {result.name}
                  </NavLink>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
