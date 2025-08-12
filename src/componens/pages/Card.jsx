import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Stack from "@mui/material/Stack";
import "./styles/cards.css";
import { useNavigate } from "react-router-dom";

export default function Card({ img_url, kind, linkArr }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCardClick = () => {
    if (isMobile) {
      setActive((prev) => !prev);
    }
  };

  const handleSendClick = () => {
    navigate(linkArr);
  };

  return (
    <div
      className={`cardcontainer cardImg ${isMobile && active ? "active" : ""}`}
      style={{ backgroundImage: `url(${img_url})` }}
      onClick={handleCardClick}
    >
      <div className="card-text-content-wrapper">
        <h4 className="h4TextCard">{t(kind)}</h4>
        <p className="pCardText">{t(`${kind} home text`)}</p>
        <Stack
          direction="row"
          spacing={2}
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={(e) => {
              e.stopPropagation(); // Prevent toggling active state
              handleSendClick();
            }}
          >
            Read More
          </Button>
        </Stack>
      </div>
    </div>
  );
}
