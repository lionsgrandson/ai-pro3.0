import React, { Suspense } from "react";
import "../style.css";
import { useTranslation } from "react-i18next";
import Card from "./Card";
import {
  calibration_img_url,
  engineering_img_url,
  repair_img_url,
  validation_img_url,
  isoImg_url,
  firstImage,
} from "../../assets";

const Lcp = React.lazy(() => import("./Lcp"));

export default function Home() {
  const { t } = useTranslation();


  return (
    <div className="d-flex flex-column align-items-center col-12">
      <Suspense
        fallback={<div style={{ width: "100vmin", height: "100vmin" }}></div>}
      >
        <Lcp />
      </Suspense>

      <div
        className="vision visionSection col-12 d-flex flex-md-row "
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.65), rgba(0,0,0,.65)), url(${firstImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
          color: "white",
        }}
      >
        <div
          className="textvisin visionContent col-12 col-md-6 d-flex flex-row"

        >
          <div className="visionCopy">
            <h2>{t("vision")}</h2>
            <div className="col-12 d-flex align-items-center justify-content-center lineWrap">
              <div className="line"></div>
            </div>
            <div className="homeBodyText">
              <p>{t("vision_text1")}</p>
              <p>{t("vision_text2")}</p>
              <p>{t("vision_text3")}</p>
              <p>{t("vision_text4")}</p>
            </div>
          </div>

          {/* ISO image floated to the right */}
          <img
            className="isoCert"
            src={isoImg_url}
            alt="ISO/IEC 17025:2017 certified"
          />

          <div className="missionCopy">
            <h2>{t("mission")}</h2>
            <div className="col-12 d-flex align-items-center justify-content-center lineWrap">
              <div className="line"></div>
            </div>
            <div className="homeBodyText">
              <p>{t("mission_text1")}</p>
              <p>{t("mission_text2")}</p>
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
