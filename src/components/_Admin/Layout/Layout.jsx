import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";

const Layout = ({ children, bg, hideThis }) => {
  return (
    <div className={`${bg}  flex flex-col h-screen`}>
      <Navbar />
      <Sidebar />
      {/* <div className="flex flex-col min-h-screen"> */}
      <main className="">
        <div className="w-full lg:ps-64 mt-12 lg:mt-auto">
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {children[0]}

            <div className={`${hideThis}`}>
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="bg-white border p-5 border-gray-200 rounded-xl shadow-md overflow-hidden ">
                    {children[1]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {/* </div> */}
    </div>
  );
};

export default Layout;
