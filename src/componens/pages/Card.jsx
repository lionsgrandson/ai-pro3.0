import React from "react";
import { useTranslation } from "react-i18next";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardOverlay,
} from "mdb-react-ui-kit";

import "../style.css";

export default function Card({ img_url, kind }) {
  const { t } = useTranslation();

  const text_style = {
    fontStyle: "italic",
    fontSize: "large",
    textShadow: "1px 1px 1px rgb(180, 180, 180)",
    fontFamily: "system-ui sans-serif",
  };

  return (
    <div
      style={{
        width: "24vw",
        minWidth: "20rem",
        height: "400px",
        margin: "10vmax 5px ",
        marginBottom: "10vmax",
      }}
    >
      <MDBCard background="dark" className="text-white">
        <MDBCardImage
          style={{ height: "inherit" }}
          overlay
          src={img_url}
          alt={kind}
        />
        <MDBCardOverlay>
          <MDBCardTitle
            style={{
              textTransform: "uppercase",
              textDecoration: "underline",
              fontWeight: "600",
            }}
          >
            {t(kind)}
          </MDBCardTitle>
          <MDBCardText style={text_style}>{t(`${kind} home text`)}</MDBCardText>
        </MDBCardOverlay>
      </MDBCard>
    </div>
  );
}
