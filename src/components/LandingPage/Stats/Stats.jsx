import { useEffect, useState } from "react";

import axios from "axios";
import Stat from "../Stat/Stat";
import { ENDPOINTS } from "../../../utils/contants/endpoint";

const Stats = () => {
  const [personal, setPersonal] = useState(0);
  const [grup, setGrup] = useState(0);
  const [total, setTotal] = useState(0);
  const [version, setVersion] = useState("");

  const [loading, setLoading] = useState({ identities: true, version: true });

  const getIdentities = async () => {
    try {
      const response = await axios.get(ENDPOINTS.GET_IDENTITIES("wa"));
      const data = response.data;
      setPersonal(data.detail[0].total);
      setGrup(data.detail[1].total);
      setTotal(data.total);
    } catch (error) {
      ("");
    } finally {
      setLoading({ identities: false });
    }
  };

  const getVersion = async () => {
    try {
      const response = await axios.get(ENDPOINTS.BOTS);
      const data = response.data.data.suikaActive;
      setVersion(data.version);
    } catch (error) {
      ("");
    } finally {
      setLoading({ version: false });
    }
  };

  useEffect(() => {
    getIdentities();
    getVersion();
  }, []);

  return (
    <div
      className="max-w-[65rem] rounded-lg bg-white mx-4 px-4 py-5 sm:px-5 sm:py-4 sm:mx-10 md:py-5 md:mx-16 lg:px-8 lg:py-5 lg:mx-auto"
      data-aos="fade-up"
      data-aos-duration="900"
    >
      <div className="grid bg-white sm:grid-cols-4 border-y border-gray-200">
        <Stat
          mainIcon="fa-solid fa-user"
          title="Personal Chat"
          number={personal}
          loading={loading.identities}
        />
        <Stat
          mainIcon="fa-solid fa-users"
          title="Grup Chat"
          number={grup}
          loading={loading.identities}
        />
        <Stat
          mainIcon="fa-solid fa-users-rectangle"
          title="Total Pengguna"
          number={total}
          additional="±"
          loading={loading.identities}
        />
        <Stat
          mainIcon="fa-solid fa-code-branch"
          title="Versi Bot"
          additional={version}
          loading={loading.version}
        />
      </div>
    </div>
  );
};

export default Stats;
