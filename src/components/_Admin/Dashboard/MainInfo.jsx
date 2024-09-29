import DashBox from "../DashBox/DashBox";

const MainInfo = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <DashBox
        name={"Total users"}
        tooltip={"Total users from suikabot"}
        value={"-"}
        percentage={"-%"}
        color_icon={"text-green-600"}
        icon={"fa-solid fa-arrow-trend-up"}
      />
      <DashBox
        name={"Total Chat (private)"}
        hidden={"hidden"}
        value={"-%"}
        hidden_icon={"hidden"}
      />
      <DashBox
        name={"Total Chat (group)"}
        hidden={"hidden"}
        value={"-%"}
        percentage={"-%"}
        color_icon={"text-red-600"}
        icon={"fa-solid fa-arrow-trend-down"}
      />
      <DashBox
        name={"Total All Chats"}
        hidden={"hidden"}
        value={"-"}
        hidden_icon={"hidden"}
      />
    </div>
  );
};

export default MainInfo;
