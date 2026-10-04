import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import HomeIcon from '@mui/icons-material/HomeOutlined';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/PhoneOutlined';
import PrintIcon from '@mui/icons-material/PrintOutlined';
import MobileIcon from '@mui/icons-material/SmartphoneOutlined';
import CompanyIcon from '@mui/icons-material/DiamondOutlined';
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.jpg";
import "./footer.css";

export default function App() {
  const { t } = useTranslation();

  return (
    <MDBFooter bgColor="dark" className="siteFooter">
      <section className="p-4 border-bottom"></section>

      <section className="">
        <MDBContainer className="text-light mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h2 className="h6 text-uppercase fw-bold mb-4 footerCompanyName">
                <CompanyIcon aria-hidden="true" className="footerIcon" />
                <bdi dir="ltr">Itai Amrofel LTD.</bdi>
              </h2>
              <img src={logo} alt={t('company logo')} style={{ height: "120px" }} />
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h2 className="h6 text-uppercase fw-bold mb-4">
                {t("contact")}
              </h2>
              <p className="footerContactRow">
                <HomeIcon aria-hidden="true" className="footerIcon" />
                <span>{t("address")}</span>
              </p>
              <p className="footerContactRow">
                <EmailIcon aria-hidden="true" className="footerIcon" />
                <a dir="ltr" href="mailto:office@ai-pro.co.il">office@ai-pro.co.il</a>
              </p>
              <p className="footerContactRow linkedin">
                <LinkedInIcon aria-hidden="true" className="footerIcon" />
                <a dir="ltr" href="https://www.linkedin.com/in/itai-amrofel-8b006a11/">
                  LinkedIn
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4 footerPhoneColumn">

              <p className="footerContactRow">
                <PhoneIcon aria-hidden="true" className="footerIcon" />
                <a dir="ltr" href="tel:07470170196">074-70170196</a>
              </p>
              <p className="footerContactRow">
                <PrintIcon aria-hidden="true" className="footerIcon" />
                <a dir="ltr" href="tel:07470170196">074-70170196</a>
              </p>
              <p className="footerContactRow">
                <MobileIcon aria-hidden="true" className="footerIcon" />
                <a dir="ltr" href="tel:0505100018">050-5100018</a>
              </p>
            </MDBCol>
          </MDBRow>
          <div className="footerDev">
            <a href="https://mosheschwartzberg.com">{t("devMs")}</a>
            <span className="footerDivider">|</span>
            <span>{t("desNoam")}</span>
          </div>
        </MDBContainer>
      </section>
    </MDBFooter>
  );
}
