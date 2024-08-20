import React, { useEffect, useState } from "react";

import axios from "axios";
import Stat from "../Stat/Stat";

const Stats = () => {
  const [person, setPerson] = useState([]);
  const [group, setGroup] = useState([]);
  const [loading, setLoading] = useState(true);

  // const getPerson = async () => {
  //   try {
  //     const response = await axios.get("https://suika.pw/api/person");
  //     setPerson(response.data.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const getGroup = async () => {
  //   try {
  //     const response = await axios.get("https://suika.pw/api/group");
  //     setGroup(response.data.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getPerson();
  //   getGroup();
  // }, []);

  // const personal = person;
  // const grup = group;
  // const total = personal + grup;

  return (
    <div
      className="max-w-[65rem] rounded-lg  bg-white mx-8 px-4 py-5 sm:px-5 sm:py-4 sm:mx-10 md:py-5 md:mx-16 lg:px-8 lg:py-5 lg:mx-auto"
      data-aos="fade-up"
      data-aos-duration="900"
    >
      <div className="grid bg-white sm:grid-cols-4 border-y border-gray-200">
        <Stat
          mainIcon="fa-solid fa-user"
          title="Personal Chat"
          number={""}
          loading={loading}
        />
        <Stat
          mainIcon="fa-solid fa-users"
          title="Grup Chat"
          number={""}
          loading={loading}
        />
        <Stat
          mainIcon="fa-solid fa-users-rectangle"
          title="Total Pengguna"
          number={""}
          additional="+"
          loading={loading}
        />
        <Stat
          mainIcon="fa-solid fa-code-branch"
          title="Versi Bot"
          additional="v1.6"
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Stats;
