import { useEffect, useState } from "react";
import { ENDPOINTS } from "../../../utils/contants/endpoint";

import ContentBox from "../DashBox/ContentBox";
import { RadialBarChart } from "../../General/Chart/Charts";
import { LoadingSpinner } from "../../General/Loading";

const ChartContent = ({ token }) => {
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
  return (
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
            <RadialBarChart series={cpuData.totalUsage} labels={"CPU Usage"} />
          </div>
          <div className="mt-4 md:mt-0">
            <ul className="space-y-1">
              <li className="text-gray-500">
                <span className="font-medium text-color4">- Brand: </span>
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
                <span className="font-medium text-color4">- CPU Cores: </span>
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
                <span className="font-medium text-color4">- CPU Thread: </span>
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
                <span className="font-medium text-color4">- RAM Total: </span>
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
                <span className="font-medium text-color4">- RAM Free: </span>
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
                <span className="font-medium text-color4">- RAM Used: </span>
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
  );
};

export default ChartContent;
