import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import "./index.css";
import App from "./App.jsx";

import AOS from "aos";
import "aos/dist/aos.css";
import "react-medium-image-zoom/dist/styles.css";

import "flowbite";

// Konfigurasi axios
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);

AOS.init();
