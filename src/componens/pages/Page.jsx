import React from "react";
import { useTranslation } from "react-i18next";
import Footer from "../Footer";

export default function Page({ kind, img_url }) {
  const { t, i18n } = useTranslation();

  const text_style = {
    fontStyle: "italic",
    fontSize: "large",
    textShadow: "1px 1px 1px rgb(180, 180, 180)",
    fontFamily: "system-ui, sans-serif",
    color: "white",
    maxWidth: "900px",
    padding: "0 20px",
    textAlign: "center",
  };

  document.body.dir = i18n.dir();

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {/* Main content with background image */}
      <div
        style={{
          flex: 1,
          backgroundImage: `url(${img_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 0",
        }}
      >
        <h1
          style={{
            borderBottom: "1px solid",
            color: "white",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          {t(kind)}
        </h1>
        <p style={text_style}>{t(`${kind} page text`)}</p>
      </div>

      {/* Footer stays at the bottom */}
      <Footer />
    </div>
  );
}
