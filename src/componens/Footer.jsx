import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.jpg";

export default function App() {
  const { t } = useTranslation();

  return (
    <MDBFooter bgColor="dark" className="text-center text-lg-start text-muted">
      <section className="p-4 border-bottom"></section>

      <section className="">
        <MDBContainer className="text-center text-light text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                Itai Amrofel LTD.
              </h6>
              <img src={logo} alt="company logo" style={{ height: "120px" }} />
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase text-center fw-bold mb-4">
                {t("contact")}
              </h6>
              <p>
                <MDBIcon icon="home" className="me-3" />
                {t("address")}
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                <a href="mailto:office@ai-pro.co.il">office@ai-pro.co.il</a>
              </p>
              <p className="linkedin">
                <MDBIcon fab icon="linkedin" className="me-3" />{" "}
                <a href="https://www.linkedin.com/in/itai-amrofel-8b006a11/">
                  Linkedin
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-0 mb-md-5"></h6>

              <p>
                <MDBIcon icon="phone" className="me-3" />
                <a href="tel:07470170196">074-70170196</a>
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" />
                <a href="tel:07470170196">074-70170196</a>
              </p>
              <p>
                <MDBIcon icon="mobile" className="me-3" />
                <a href="tel:0505100018">050-5100018</a>
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </MDBFooter>
  );
}
