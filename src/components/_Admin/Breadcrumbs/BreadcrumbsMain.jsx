import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

const BreadcrumbsMain = () => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const pathnames = location.pathname
      .split("/")
      .filter((x) => x && x !== "sb");

    setBreadcrumbs(pathnames);
  }, [location]);

  return (
    <div className="fixed top-10 mt-6 inset-x-0 z-10 bg-white border-y px-4 sm:px-6 lg:px-8 lg:hidden">
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

export default BreadcrumbsMain;
