import { Helmet } from "react-helmet-async";

// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

import Layout from "../../components/_Admin/Layout/Layout";
import MainInfo from "../../components/_Admin/Dashboard/MainInfo";
import ChartContent from "../../components/_Admin/Dashboard/ChartContent";
import BreadcrumbsMain from "../../components/_Admin/Breadcrumbs/BreadcrumbsMain";
import { useSelector } from "react-redux";
import DashBox from "../../components/_Admin/DashBox/DashBox";
import { Button } from "flowbite-react";
import { useState } from "react";
import axios from "axios";
import { ENDPOINTS } from "../../utils/contants/endpoint";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dashboard = () => {
  const token =
    useSelector((state) => state.data_user.access_token) ||
    localStorage.getItem("token");

  const [loading, setLoading] = useState(null);

  // const navigate = useNavigate();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(ENDPOINTS.USERS, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       // setMessage(response.data.message);
  //       const decoded = jwtDecode(token);
  //       // console.log("ini decoded:", decoded);
  //       // console.log(decoded.name);
  //       setName(decoded.name);
  //     } catch (error) {
  //       console.error("Failed to fetch data", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const restartSuikaBot = async () => {
    Swal.fire({
      title: "Sure?",
      showCancelButton: true,
      confirmButtonText: "Sure",
      icon: "question",
      confirmButtonColor: "#ffb803",
      cancelButtonColor: "#a3a5a6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        // console.log("Restarting SuikaBot...");
        Swal.fire({
          title: "Restarting SuikaBot...",
          timerProgressBar: true,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        try {
          const response = await axios.get(ENDPOINTS.RESTART_SUIKABOT);
          const msg = response.data.message;

          setLoading(false);
          Swal.fire({
            icon: "success",
            title: "Success Restart SuikaBot",
            html: msg,
            showConfirmButton: false,
          });
        } catch (error) {
          console.log(error);
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: "Failed Restart SuikaBot",
            showConfirmButton: false,
          });
        } finally {
          setTimeout(() => {
            setLoading(null);
          }, 5000);
        }
      }
    });
  };

  const button = (
    <div className="flex items-center gap-x-2 z-0">
      <Button
        onClick={() => restartSuikaBot()}
        className="bg-orange-400 hover:bg-orange-500 focus:ring-orange-300"
      >
        Restart now{" "}
        <FontAwesomeIcon
          className={`mt-1 ml-2 ${loading === null ? "hidden" : ""}`}
          icon={
            loading != false
              ? "fa-solid fa-spinner"
              : "fa-regular fa-circle-check"
          }
          spin={loading != false ? true : false}
        />
      </Button>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Dashboard | SuikaBot</title>
      </Helmet>
      <Layout bg={"bg-color1"}>
        {[
          <div key={1}>
            <BreadcrumbsMain />
            <MainInfo />
          </div>,
        ]}

        {[
          <div key={2}>
            <section id="fast-action-button" className="my-5">
              <h3 className="font-medium text-2xl p-1">Fast Action Button</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <DashBox
                  name={"Restart SuikaBot"}
                  hidden={"hidden"}
                  value={button}
                  hidden_icon={"hidden"}
                />
              </div>
            </section>

            {/* CHART */}
            <section id="monitoring">
              <h3 className="font-medium text-2xl p-1">Monitoring System</h3>
              <ChartContent token={token} />
            </section>
          </div>,
        ]}
      </Layout>
    </>
  );
};

export default Dashboard;
