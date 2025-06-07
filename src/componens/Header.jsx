import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { logo_cut, israel_color, usa_color } from "../assets";
import { useTranslation } from "react-i18next";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
export default function Header() {
  const [expanded, setExpanded] = useState(false);
  const { t, i18n } = useTranslation();

  const dir = i18n.dir();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div
      style={{
        direction: "rtl",
        position: "fixed",
        width: " 100vw",
        zIndex: "1",
      }}
    >
      <Navbar
        collapseOnSelect
        expand="md"
        bg="light"
        variant="light"
        expanded={expanded}
        id="togNav"
        style={{ direction: dir, flexWrap: "wrap" }}
      >
        <Navbar.Brand>
          <div style={{ marginLeft: "20px" }}>
            <img
              src={logo_cut}
              style={{ width: "40px", borderRadius: "50%" }}
              alt="image logo"
            />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          style={{ marginRight: "20px" }}
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />
        <Navbar.Collapse id="responsive-navbar-nav" style={{ direction: dir }}>
          <Nav className="me-auto my-2 my-lg-0 text-secondary d-flex align-items-center col-10">
            <Nav.Link as={Link} to="/" className="test2">
              <strong>{t("home").toUpperCase()}</strong>
            </Nav.Link>
            <Nav.Link as={Link} to="/calibration" className="test2">
              <strong>{t("calibration").toUpperCase()}</strong>
            </Nav.Link>
            <Nav.Link as={Link} to="/validation" className="test2">
              <strong>{t("validation").toUpperCase()}</strong>
            </Nav.Link>
            <Nav.Link as={Link} to="/engineering" className="test2">
              <strong>{t("engineering").toUpperCase()}</strong>
            </Nav.Link>
            <Nav.Link as={Link} to="/repair" className="test2">
              <strong>{t("repair services").toUpperCase()}</strong>
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="test2">
              <strong>{t("contact").toUpperCase()}</strong>
            </Nav.Link>
            <div style={{ display: "flex" }} className="test2">
              <Nav.Link
                as={Link}
                to="https://www.Linkedin.com/in/itai-amrofel-8b006a11/"
                className="test2"
                style={{ marginLeft: "0.5rem" }}
              >
                <MDBIcon fab icon="linkedin" />
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="mailto:office@ai-pro.co.il"
                className="test2"
              >
                <MDBIcon icon="envelope" />
              </Nav.Link>
            </div>
          </Nav>

          <div
            className="col-3 col-md-1 d-flex align-items-center justify-content-between justify-content-md-evenly"
            style={{
              marginRight: "20px",
              marginLeft: "20px",
            }}
          >
            <img
              src={usa_color}
              style={{ width: "30px", marginRight: "5px" }}
              alt="usa flag"
              onClick={() => changeLanguage("en")}
            />
            <img
              src={israel_color}
              style={{ width: "30px" }}
              alt="usa flag"
              onClick={() => changeLanguage("he")}
            />
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
