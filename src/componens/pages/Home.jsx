import React, { Suspense } from "react";
import "../style.css";
import { useTranslation } from "react-i18next";
import Card from "./Card";
import {
  calibration_img_url,
  engineering_img_url,
  repair_img_url,
  validation_img_url,
  low,
  isoImg_url,
  accreditedSecond,
  accredited,
  accreditedGreen,
  firstImage,
} from "../../assets";

export default function Home() {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();

  const Lcp = React.lazy(() => import("./Lcp"));

  const text_style = {
    fontStyle: "italic",
    fontSize: "large",
    textShadow: "1px 1px 1px rgb(180, 180, 180)",
    fontFamily: "system-ui sans-serif",
    paddingBottom: "15vmin",
  };

  return (
    <div className="d-flex flex-column align-items-center col-12">
      <Suspense
        fallback={<div style={{ width: "100vmin", height: "100vmin" }}></div>}
      >
        <Lcp />
      </Suspense>

      <div
        className="vision col-12 d-flex flex-md-row "
        style={{
          height: "",
          backgroundImage: `url(${firstImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100vw",
          color: "white",
        }}
      >
        <div
          className="textvisin col-12 col-md-6 d-flex flex-row"
          style={{
            padding: "20vmin",
            paddingBottom: "5vmin",
            width: "100vw",
            flexWrap: "wrap",
          }}
        >
          <div style={{ width: "max-content" }}>
            <h2>{t("vision")}</h2>
            <div
              className="col-12 d-flex align-items-center justify-content-center"
              style={{ height: "5vh", width: "10vw" }}
            >
              <div className="line"></div>
            </div>
            <div style={text_style}>
              <p>{t("vision_text1")}</p>
              <p>{t("vision_text2")}</p>
              <p>{t("vision_text3")}</p>
              <p>{t("vision_text4")}</p>
              {/* <p>{t("vision_text5")}</p> */}
            </div>
            <div style={{ height: "5vmin" }}></div>
          </div>
          <div style={{ width: "max-content" }}>
            <h2>{t("mission")}</h2>
            <div
              className="col-12 d-flex align-items-center justify-content-center"
              style={{ height: "5vh", width: "10vw" }}
            >
              <div className="line"></div>
            </div>
            <div style={text_style}>
              <p>{t("mission_text1")}</p>
              <p>{t("mission_text2")}</p>
              <p>{t("mission1")}</p>
              <p>{t("mission2")}</p>
              <p>{t("mission3")}</p>
              <p>{t("mission_text3")}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="textvisin col-12 d-flex flex-column justify-content-center"
        style={{
          paddingInlineStart: "5vmin",
          paddingBottom: "5vmin",
        }}
      ></div>

      <div className="divCert">
        <img
          className="imgCert"
          src={isoImg_url}
          alt="ISO/IEC 17025:2017 certified"
        />
        <img
          className="imgCert"
          src={accreditedSecond}
          alt="Accredited certified Yellow"
        />
      </div>
      <div
        className="cards d-flex justify-content-center col-12 cardDiv"
        style={{ margin: "0" }}
      >
        <Card
          img_url={calibration_img_url}
          kind="calibration"
          linkArr={"calibration"}
        />
        <Card
          img_url={validation_img_url}
          kind="validation"
          linkArr={"validation"}
        />
        <Card
          img_url={engineering_img_url}
          kind="engineering"
          linkArr={"engineering"}
        />
        <Card
          img_url={repair_img_url}
          kind="repair services"
          linkArr={"repair"}
        />
      </div>

      <div style={{ margin: "5vmin" }}></div>
    </div>
  );
}
