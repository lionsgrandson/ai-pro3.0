import React from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Stack from "@mui/material/Stack";
import "./styles/cards.css";
import { useNavigate } from "react-router-dom";

export default function Card({ img_url, kind, linkArr }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleSendClick = () => {
    navigate(linkArr);
  };
  return (
    <div
      className="cardcontainer cardImg"
      style={{ backgroundImage: `url(${img_url})` }}
    >
      <div className="card-text-content">
        <h4 className="h4TextCard card-text-content">{t(kind)}</h4>
        <p className="pCardText card-text-content">{t(`${kind} home text`)}</p>
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
            onClick={handleSendClick}
          >
            Read More
          </Button>
        </Stack>
      </div>
    </div>
  );
}
