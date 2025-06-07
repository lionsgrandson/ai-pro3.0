import "react-bootstrap/dist/react-bootstrap.min.js";
import { Route, Routes } from "react-router-dom";
import Home from "./componens/pages/Home";
import Header from "./componens/Header";
import Calibration from "./componens/pages/Calibration";
import Validation from "./componens/pages/Validation";
import Repair from "./componens/pages/Repair";
import Engineering from "./componens/pages/Engineering";
import Contact from "./componens/pages/Contact";
import Footer from "./componens/Footer";
import { FloatingWhatsApp } from "react-floating-whatsapp";

function App() {
  return (
    <div>
      <FloatingWhatsApp phoneNumber="972505100018" accountName="AI Pro" />
      <Header />
      <Routes>
        <Route exact path="ai-pro-temp/" element={<Home />} />
        <Route path="ai-pro-temp/calibration" element={<Calibration />} />
        <Route path="ai-pro-temp/engineering" element={<Engineering />} />
        <Route path="ai-pro-temp/repair" element={<Repair />} />
        <Route path="ai-pro-temp/validation" element={<Validation />} />
        <Route path="ai-pro-temp/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
