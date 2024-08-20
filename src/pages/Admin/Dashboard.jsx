import React, { useEffect } from "react";
import Layout from "../../components/_Admin/Layout/Layout";

const Dashboard = () => {
  useEffect(() => {
    // Menambahkan class saat komponen di-mount
    document.body.classList.add("bg-gray-50", "dark:bg-neutral-900");

    // Membersihkan class saat komponen di-unmount
    return () => {
      document.body.classList.remove("bg-gray-50", "dark:bg-neutral-900");
    };
  }, []);
  return (
    <Layout>
      <div>
        <h1> ini dashboard </h1>
      </div>
    </Layout>
  );
};

export default Dashboard;
