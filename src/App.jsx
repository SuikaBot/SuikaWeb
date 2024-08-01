import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Landingpage/Home";
import NotFound from "./pages/NotFound";

import { ThemeProvider } from "styled-components";
import theme from "./utils/contants/theme";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import SupportList from "./pages/Converter/SupportList";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            {/* Not Found */}
            <Route path="*" element={<NotFound />} />

            {/* Main Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/converter/support-list" element={<SupportList />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
library.add(fab, fas, far);

console.log(`
 .d8888b.           d8b 888               888888b.    .d88888b.  88888888888 
d88P  Y88b          Y8P 888               888  "88b  d88P" "Y88b     888     
Y88b.                   888               888  .88P  888     888     888     
 "Y888b.   888  888 888 888  888  8888b.  8888888K.  888     888     888     
    "Y88b. 888  888 888 888 .88P     "88b 888  "Y88b 888     888     888     
      "888 888  888 888 888888K  .d888888 888    888 888     888     888     
Y88b  d88P Y88b 888 888 888 "88b 888  888 888   d88P Y88b. .d88P     888     
 "Y8888P"   "Y88888 888 888  888 "Y888888 8888888P"   "Y88888P"      888                                                          
`);
