import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

const Breadcrumbs = (props) => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const pathnames = location.pathname
      .split("/")
      .filter((x) => x && x !== "sb");

    setBreadcrumbs(pathnames);
  }, [location]);

  return (
    <div className="mt-16 fixed top-15 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 lg:px-8 lg:hidden">
      <div className="flex items-center py-2">
        {/* <!-- Breadcrumb --> */}
        <ol className="ms-3 flex items-center whitespace-nowrap">
          <Breadcrumb breadcrumbs={breadcrumbs} />
        </ol>
        {/* <!-- End Breadcrumb --> */}
      </div>
    </div>
  );
};

export default Breadcrumbs;
