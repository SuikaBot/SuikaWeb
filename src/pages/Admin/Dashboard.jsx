import { Helmet } from "react-helmet-async";

// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

import Layout from "../../components/_Admin/Layout/Layout";
import MainInfo from "../../components/_Admin/Dashboard/MainInfo";
import ChartContent from "../../components/_Admin/Dashboard/ChartContent";
import BreadcrumbsMain from "../../components/_Admin/Breadcrumbs/BreadcrumbsMain";

const Dashboard = () => {
  // const { auth, refreshToken } = useContext(AuthContext);
  // const [name, setName] = useState("");
  const token = JSON.parse(localStorage.getItem("user_data")).access_token;

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

  return (
    <>
      <Helmet>
        <title>Dashboard | SuikaBot</title>
      </Helmet>
      <Layout bg={"bg-color1"} hideThis={"hidden"}>
        {[
          <div key={1}>
            <BreadcrumbsMain />
            <MainInfo />
            {/* CHART */}
            <ChartContent token={token} />
          </div>,
        ]}

        {[<div key={2}></div>]}
      </Layout>
    </>
  );
};

export default Dashboard;
