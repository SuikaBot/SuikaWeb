import React from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Zoom from "react-medium-image-zoom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Layout from "../../components/_Admin/Layout/Layout";

import imgNotFound from "../../assets/404.svg";

const AdminNotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 | SuikaBot</title>
      </Helmet>

      <Layout bg={"bg-color1"} hideThis={"hidden"}>
        {[
          <div
            key={1}
            className="max-w-[50rem] lg:ps-[260px] xl:ps-[0] flex flex-col mx-auto size-full my-8"
          >
            <header className="mb-auto flex justify-center w-full py-4">
              <nav
                className="px-4 sm:px-6 lg:px-8 text-center"
                aria-label="Global"
              >
                <p className="z-10 pt-10 flex-none text-xl font-semibold sm:text-3xl">
                  . . . . . . . .
                </p>
              </nav>
            </header>

            <main id="content">
              <div className="text-center pb-20 px-4 sm:px-6 lg:px-8">
                <Zoom>
                  <img
                    className="h-auto max-w-lg mx-auto rounded-lg"
                    src={imgNotFound}
                    alt=""
                  />
                </Zoom>
                <p className="mt-3 text-gray-600">
                  Oops, mungkin ada yang salah (?)
                </p>
                <p className="text-gray-600">
                  Halaman tidak ditemukan atau telah kadaluarsa.
                </p>
                <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
                  <NavLink
                    className="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-color3 text-white hover:bg-color2-hover disabled:opacity-50 tras disabled:pointer-events-none transition duration-0 hover:duration-150"
                    to={"/sb/dashboard"}
                  >
                    <FontAwesomeIcon
                      className="flex-shrink-0 size-4"
                      icon="fa-solid fa-angle-left"
                    />
                    Dashboard
                  </NavLink>
                </div>
              </div>
            </main>
          </div>,
        ]}
        {[<div key={2}></div>]}
      </Layout>
    </>
  );
};

export default AdminNotFound;
