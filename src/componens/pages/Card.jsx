import React from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Stack from "@mui/material/Stack";
import "./styles/cards.css";
import { Link } from "react-router-dom";

export default function Card({ img_url, kind, linkArr }) {
  const { t } = useTranslation();

  return (
    <article
      className="cardcontainer cardImg"
      style={{ backgroundImage: `url(${img_url})` }}
    >
      <div className="card-text-content-wrapper">
        <h2 className="h4TextCard">{t(kind)}</h2>
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
            component={Link}
            to={`/${linkArr}`}
            aria-label={`${t('read more')}: ${t(kind)}`}
            variant="contained"
            endIcon={<ArrowForwardIcon />}
          >
            {t('read more')}
          </Button>
        </Stack>
      </div>
    </article>
  );
}
