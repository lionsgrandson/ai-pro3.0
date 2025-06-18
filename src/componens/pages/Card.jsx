import React from "react";
import { useTranslation } from "react-i18next";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardOverlay,
  MDBRipple,
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
      {/* <MDBRipple className="bg-image" rippleTag="div" rippleColor="light">
        <MDBCardImage
          style={{ height: "inherit" }}
          overlay
          src={img_url}
          alt={kind}
          className="w-100"
        />

        <MDBCardOverlay>
          <MDBCardTitle
            style={{
              textTransform: "uppercase",
              textDecoration: "underline",
              fontWeight: "600",
            }}
            className="d-flex justify-content-center align-items-center h-100"
          >
            {t(kind)}
            <div
              className="mask"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
            ></div>
          </MDBCardTitle>
          <div className="hover-overlay">
            <div
              className="mask"
              style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
            ></div>
          <MDBCardText style={text_style}>{t(`${kind} home text`)}</MDBCardText>
        </MDBCardOverlay>
      </MDBRipple>
      </div>
            */}

      <MDBRipple
        rippleTag="div"
        className="bg-image hover-overlay hover-zoom hover-shadow"
      >
        <div className="cardcontainer">
          <img
            overlay
            src={img_url}
            alt={kind}
            className="w-100"
            style={{ height: "70vh" }}
          />
          <div className="cardcentered">
            <h4
              style={{
                textTransform: "uppercase",
                textDecoration: "underline",
                fontWeight: "600",
              }}
            >
              {t(kind)}
            </h4>
            <p style={text_style}>
              {t(`${kind} home text`)}
              <div
                className="mask"
                style={{ backgroundColor: "rgba(57, 192, 237, 0.2)" }}
              ></div>
            </p>
          </div>
        </div>
      </MDBRipple>
    </div>
  );
}
