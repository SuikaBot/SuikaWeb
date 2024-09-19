import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import theme from "./utils/contants/theme";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import Home from "./pages/Landingpage/Home";
import SupportList from "./pages/Landingpage/Converter/SupportList";
import Dashboard from "./pages/Admin/Dashboard";
import NotFound from "./pages/Landingpage/NotFound";
import AdminNotFound from "./pages/Admin/AdminNotFound";
import BotStatus from "./pages/Admin/WebManagement/BotStatus";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import { UserProvider } from "./context/UserContext";
import ManageUsers from "./pages/Admin/UsersManagement/ManageUsers";

import { initFlowbite } from "flowbite";
import ShortenUrl from "./pages/Landingpage/ShortenURL/ShortenUrl";

const App = () => {
  const location = useLocation();
  useEffect(() => {
    initFlowbite();
  }, [location.pathname]);

  // useEffect(() => {
  //   if (window.HSStaticMethods) {
  //     window.HSStaticMethods.autoInit();
  //   }
  // }, [location.pathname]);

  const isAuthenticated = () => {
    return JSON.parse(localStorage.getItem("user_data")) !== null;
  };

  return (
    <HelmetProvider>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/*" element={<NotFound />} />
            <Route index path="/" element={<Home />} />
            <Route path="/s/:shortUrl" element={<ShortenUrl />} />
            <Route path="/converter/support-list" element={<SupportList />} />

            <Route
              path="/sb/login"
              element={
                isAuthenticated() ? (
                  <Navigate to={"/sb/dashboard"} />
                ) : (
                  <LoginPage />
                )
              }
            />
            <Route
              path="/sb/register"
              element={
                isAuthenticated() ? (
                  <Navigate to={"/sb/dashboard"} />
                ) : (
                  <RegisterPage />
                )
              }
            />

            <Route
              path="/sb/*"
              element={
                isAuthenticated() ? (
                  <AdminNotFound />
                ) : (
                  <Navigate to={"/sb/login"} />
                )
              }
            />
            <Route
              path="/sb/dashboard"
              element={
                isAuthenticated() ? (
                  <Dashboard />
                ) : (
                  <Navigate to={"/sb/login"} />
                )
              }
            />
            <Route
              path="/sb/manage-users"
              element={
                isAuthenticated() ? (
                  <ManageUsers />
                ) : (
                  <Navigate to={"/sb/manage-users"} />
                )
              }
            />
            <Route
              path="/sb/bot-status"
              element={
                isAuthenticated() ? (
                  <BotStatus />
                ) : (
                  <Navigate to={"/sb/login"} />
                )
              }
            />
          </Routes>
        </ThemeProvider>
      </UserProvider>
    </HelmetProvider>
  );
};

export default App;
library.add(fab, fas, far);

// console.log(`
//  .d8888b.           d8b 888               888888b.    .d88888b.  88888888888
// d88P  Y88b          Y8P 888               888  "88b  d88P" "Y88b     888
// Y88b.                   888               888  .88P  888     888     888
//  "Y888b.   888  888 888 888  888  8888b.  8888888K.  888     888     888
//     "Y88b. 888  888 888 888 .88P     "88b 888  "Y88b 888     888     888
//       "888 888  888 888 888888K  .d888888 888    888 888     888     888
// Y88b  d88P Y88b 888 888 888 "88b 888  888 888   d88P Y88b. .d88P     888
//  "Y8888P"   "Y88888 888 888  888 "Y888888 8888888P"   "Y88888P"      888
// `);
