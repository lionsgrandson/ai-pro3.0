import React from 'react'
import Videobg from "../../assets/video_home_com.mp4";
import { useTranslation } from "react-i18next";

export default function Lcp() {
    const {i18n,t} =useTranslation()

    const dir = i18n.dir();

    const slogan_style = {
      fontFamily: "system-ui sans-serif",
      fontWeight: "bold",
      fontStyle: "italic",
      textShadow: "3px 1px 2px black",
      wordSpacing: "100vmax",
      fontSize: "10vmin",
      direction: { dir },
    };


  return (
    <div className=" d-flex flex-column align-items-center col-12">
    <video
      src={Videobg}
      autoPlay
      loop
      muted
      style={{ objectFit: "cover", width: "100%", height: "100vh" }}
    />
    <div
      className="col-12 position-absolute flex-column justify-content-around d-flex align-items-center"
      style={{
        padding: "10vh",
        objectFit: "cover",
        width: "100%",
        height: "100vh",
      }}
    >
      <div className="text-light" style={{ fontSize: "30px" }}>
        <h1 style={slogan_style}>{t("slogen")}</h1>
      </div>
    </div>
  </div>
  )
}
