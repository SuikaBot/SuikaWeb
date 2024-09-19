import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import axios from "axios";
import { jwtDecode } from "jwt-decode";

import Layout from "../../components/_Admin/Layout/Layout";
import DashBox from "../../components/_Admin/DashBox/DashBox";
import ContentBox from "../../components/_Admin/DashBox/ContentBox";
import { LoadingSpinner } from "../../components/General/Loading";
import DataTableBase from "../../components/General/DataTableBase";
import { RadialBarChart } from "../../components/General/Chart/Charts";
import { ENDPOINTS } from "../../utils/contants/endpoint";

const Dashboard = () => {
  // const { auth, refreshToken } = useContext(AuthContext);
  const [name, setName] = useState("");
  const token = JSON.parse(localStorage.getItem("user_data")).access_token;

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(ENDPOINTS.USERS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // setMessage(response.data.message);
        const decoded = jwtDecode(token);
        // console.log("ini decoded:", decoded);
        // console.log(decoded.name);
        setName(decoded.name);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  const [cpuData, setCpuData] = useState({
    name: 0,
    cores: 0,
    threads: 0,
    totalUsage: 0,
  });
  const [ramData, setRamData] = useState({
    total: 0,
    free: 0,
    used: 0,
    usagePercentage: 0,
  });

  // Fetch data setiap 5 detik
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawResponse = await fetch(ENDPOINTS.SYSTEM_STATS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const response = await rawResponse.json();
        const data = response.cache;

        console.log("Data:", data);

        if (response.cached) {
          localStorage.setItem(
            "cpuData",
            JSON.stringify(data.data[0].cpuCoresUsage)
          );
          localStorage.setItem("ramData", JSON.stringify(data.data[0].ram));

          setCpuData(data.data[0].cpuCoresUsage);
          setRamData(data.data[0].ram);
        }
      } catch (error) {
        console.error("Error fetching system stats:", error);
      }
    };

    // Inisialisasi data dari localStorage
    const initializeFromLocalStorage = () => {
      const savedCpuData = localStorage.getItem("cpuData");
      const savedRamData = localStorage.getItem("ramData");

      if (savedCpuData && savedRamData) {
        setCpuData(JSON.parse(savedCpuData));
        setRamData(JSON.parse(savedRamData));
      }
    };

    initializeFromLocalStorage();
    fetchData(); // Fetch data awal
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval); // Clear interval saat komponen unmount
  }, []);

  const getColors = (value) => {
    if (value <= 35)
      return { bgColor: "bg-emerald-200", textColor: "text-color4" };
    if (value <= 75)
      return { bgColor: "bg-amber-200", textColor: "text-color4" };
    return { bgColor: "bg-rose-200", textColor: "text-color4" };
  };

  const getColorCpu = getColors(cpuData.totalUsage);
  const bgColorCpu = getColorCpu.bgColor + " " + getColorCpu.textColor;

  const getColorRam = getColors(ramData.usagePercentage);
  const bgColorRam = getColorRam.bgColor + " " + getColorRam.textColor;

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "Sold",
      selector: (row) => row.sold,
      sortable: true,
    },
    {
      name: "Dados",
      selector: (row) => row.dados,
      sortable: true,
    },
  ];

  const data = [
    { id: 1, title: "Beetlejuice", year: "1988", sold: "sold", dados: "dados" },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
      sold: "sold",
      dados: "dados",
    },
    { id: 3, title: "E.T.", year: "1982", sold: "sold", dados: "dados" },
    { id: 4, title: "The Goonies", year: "1985", sold: "sold", dados: "dados" },
    { id: 5, title: "Gremlins", year: "1984", sold: "sold", dados: "dados" },
    {
      id: 6,
      title: "Back to the Future",
      year: "1985",
      sold: "sold",
      dados: "dados",
    },
    { id: 7, title: "Labyrinth", year: "1986", sold: "sold", dados: "dados" },
    {
      id: 8,
      title: "The Princess Bride",
      year: "1987",
      sold: "sold",
      dados: "dados",
    },
    {
      id: 9,
      title: "Short Circuit",
      year: "1986",
      sold: "sold",
      dados: "dados",
    },
    { id: 10, title: "Willow", year: "1988", sold: "sold", dados: "dados" },
    {
      id: 11,
      title: "The Lost Boys",
      year: "1987",
      sold: "sold",
      dados: "dados",
    },
    { id: 12, title: "Batman", year: "1989", sold: "sold", dados: "dados" },
    {
      id: 13,
      title: "Beetlejuice",
      year: "1988",
      sold: "sold",
      dados: "dados",
    },
    {
      id: 14,
      title: "Ghostbusters",
      year: "1984",
      sold: "sold",
      dados: "dados",
    },
    { id: 15, title: "E.T.", year: "1982", sold: "sold", dados: "dados" },
    {
      id: 16,
      title: "The Goonies",
      year: "1985",
      sold: "sold",
      dados: "dados",
    },
    { id: 17, title: "Gremlins", year: "1984", sold: "sold", dados: "dados" },
    {
      id: 18,
      title: "Back to the Future",
      year: "1985",
      sold: "sold",
      dados: "dados",
    },
    { id: 19, title: "Labyrinth", year: "1986", sold: "sold", dados: "dados" },
    {
      id: 20,
      title: "The Princess Bride",
      year: "1987",
      sold: "sold",
      dados: "dados",
    },
    {
      id: 21,
      title: "Short Circuit",
      year: "1986",
      sold: "sold",
      dados: "dados",
    },
    { id: 22, title: "Willow", year: "1988", sold: "sold", dados: "dados" },
    {
      id: 23,
      title: "The Lost Boys",
      year: "1987",
      sold: "sold",
      dados: "dados",
    },
    { id: 24, title: "Batman", year: "1989", sold: "sold", dados: "dados" },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard | SuikaBot</title>
      </Helmet>
      <Layout bg={"bg-color1"} hideThis={"hidden"}>
        {[
          <div key={1}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <DashBox
                name={"Total users"}
                tooltip={"The number of daily users"}
                value={"72,540"}
                percentage={"1.7%"}
                color_icon={"text-green-600"}
                icon={"fa-solid fa-arrow-trend-up"}
              />
              <DashBox
                name={"Sessions"}
                hidden={"hidden"}
                value={"29.4%"}
                hidden_icon={"hidden"}
              />
              <DashBox
                name={"Avg. Click Rate"}
                hidden={"hidden"}
                value={"56.8%"}
                percentage={"1.7%"}
                color_icon={"text-red-600"}
                icon={"fa-solid fa-arrow-trend-down"}
              />
              <DashBox
                name={"Pageviews"}
                hidden={"hidden"}
                value={"92,913"}
                hidden_icon={"hidden"}
              />
            </div>

            {/* CHART */}
            <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mt-5">
              <ContentBox
                small_name={"Monitoring"}
                name={"CPU Stats"}
                icon={"fa-solid fa-chart-simple"}
                value={`${cpuData.totalUsage}%`}
                color_icon={bgColorCpu}
              >
                <div className="flex items-center flex-col md:flex-row md:space-x-1">
                  <div className="flex-shrink-0">
                    <RadialBarChart
                      series={cpuData.totalUsage}
                      labels={"CPU Usage"}
                    />
                  </div>
                  <div className="mt-4 md:mt-0">
                    <ul className="space-y-1">
                      <li className="text-gray-500">
                        <span className="font-medium text-color4">
                          - Brand:{" "}
                        </span>
                        {cpuData.name != 0 ? (
                          cpuData.name
                        ) : (
                          <LoadingSpinner
                            size={5}
                            color={"text-blue-500"}
                            name={"Loading..."}
                          />
                        )}
                      </li>
                      <li className="text-gray-500">
                        <span className="font-medium text-color4">
                          - CPU Cores:{" "}
                        </span>
                        {cpuData.cores != 0 ? (
                          cpuData.cores
                        ) : (
                          <LoadingSpinner
                            size={5}
                            color={"text-blue-500"}
                            name={"Loading..."}
                          />
                        )}
                      </li>
                      <li className="text-gray-500">
                        <span className="font-medium text-color4">
                          - CPU Thread:{" "}
                        </span>
                        {cpuData.threads != 0 ? (
                          cpuData.threads
                        ) : (
                          <LoadingSpinner
                            size={5}
                            color={"text-blue-500"}
                            name={"Loading..."}
                          />
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </ContentBox>
              <ContentBox
                small_name={"Monitoring"}
                name={"RAM Stats"}
                icon={"fa-solid fa-chart-simple"}
                value={`${ramData.usagePercentage}%`}
                color_icon={bgColorRam}
              >
                <div className="flex items-center flex-col md:flex-row md:space-x-1">
                  <div className="flex-shrink-0">
                    <RadialBarChart
                      series={ramData.usagePercentage}
                      labels={"Ram Usage"}
                    />
                  </div>
                  <div className="mt-4 md:mt-0">
                    <ul className="space-y-1">
                      <li className="text-gray-500">
                        <span className="font-medium text-color4">
                          - RAM Total:{" "}
                        </span>
                        {ramData.total != 0 ? (
                          ramData.total + " GB"
                        ) : (
                          <LoadingSpinner
                            size={5}
                            color={"text-blue-500"}
                            name={"Loading..."}
                          />
                        )}
                      </li>
                      <li className="text-gray-500">
                        <span className="font-medium text-color4">
                          - RAM Free:{" "}
                        </span>
                        {ramData.free != 0 ? (
                          ramData.free + " GB"
                        ) : (
                          <LoadingSpinner
                            size={5}
                            color={"text-blue-500"}
                            name={"Loading..."}
                          />
                        )}
                      </li>
                      <li className="text-gray-500">
                        <span className="font-medium text-color4">
                          - RAM Used:{" "}
                        </span>
                        {ramData.used != 0 ? (
                          ramData.used + " GB"
                        ) : (
                          <LoadingSpinner
                            size={5}
                            color={"text-blue-500"}
                            name={"Loading..."}
                          />
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </ContentBox>
            </div>

            {/* <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
              <ContentBox
                small_name={"Income"}
                name={"$126,238.49"}
                icon={"fa-solid fa-arrow-down"}
                value={"25%"}
                color_icon={"bg-teal-500/10 text-teal-500"}
              >
                <BarChart />
              </ContentBox>

              <ContentBox
                small_name={"Visitors"}
                name={"80.3k"}
                icon={"fa-solid fa-arrow-down"}
                value={"2%"}
                color_icon={"bg-red-500/10 text-red-500"}
              >
                <AreaChart />
              </ContentBox>
            </div> */}
          </div>,
        ]}

        {[
          <div key={2}>
            <DataTableBase
              title={"Test Data Table"}
              columns={columns}
              data={data}
              highlightOnHover
              striped
              responsive
              subHeader
            />
          </div>,
        ]}
      </Layout>
    </>
  );
};

export default Dashboard;
