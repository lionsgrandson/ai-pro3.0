import React from "react";
import { useTranslation } from "react-i18next";
import Footer from "../Footer";

export default function Page({ kind, img_url }) {
  const { t, i18n } = useTranslation();

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
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            background: "rgba(0, 0, 0, 0.55)",
            padding: "30px",
            borderRadius: "12px",
            maxWidth: "900px",
            width: "100%",
            textAlign: "center",
            color: "white",
          }}
        >
          <h1
            style={{
              borderBottom: "1px solid white",
              marginBottom: "20px",
            }}
          >
            {t(kind)}
          </h1>
          <p
            style={{
              fontStyle: "italic",
              fontSize: "large",
              textShadow: "1px 1px 1px rgb(180, 180, 180)",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {t(`${kind} page text`)}
          </p>
        </div>
      </div>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}
