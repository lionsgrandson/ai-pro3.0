import React from "react";
import { useTranslation } from "react-i18next";

export default function Page({ kind, img_url }) {
  const { t } = useTranslation();

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "calc(100svh - 64px)" }}
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
          className="servicePageContent"
          style={{
            background: "rgba(0, 0, 0, 0.7)",
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
            className="servicePageText"
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
