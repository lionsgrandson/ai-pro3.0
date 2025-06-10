import React from "react";
import { MDBInput, MDBCheckbox, MDBBtn, MDBTextArea } from "mdb-react-ui-kit";
import { useTranslation } from "react-i18next";
import { useRef, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { firstImage } from "../../assets";

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const style = {
    height: "80vmin",
    minHeight: "500px",
    backgroundImage: `url(${firstImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    color: "white",
  };

  useEffect(() => emailjs.init("WRe1AxRZRD1p_fgpj"), []);

  const handleClick = async (e) => {
    e.preventDefault();
    const serviceId = "service_1lr9773";
    const templateId = "template_mw9ea3n";
    try {
      setLoading(true);
      await emailjs.send(serviceId, templateId, {
        name: name,
        message: message,
        subject: subject,
        email: email,
      });
      alert("email successfully sent check inbox");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="col-12 d-flex flrx-column justify-content-center align-items-center"
      style={style}
    >
      <form
        id="form"
        className="text-center"
        style={{
          width: "100%",
          maxWidth: "300px",
          fontStyle: "italic",
          color: "white !important",
        }}
      >
        <h1>{t("contact us")}</h1>

        <MDBInput
          label={t("name")}
          v-model="name"
          wrapperClass="mb-4"
          onChange={(e) => setName(e.target.value)}
        />

        <MDBInput
          type="email"
          style={{ color: "white" }}
          label={t("email")}
          v-model="email"
          wrapperClass="mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <MDBInput
          label={t("subject")}
          v-model="subject"
          wrapperClass="mb-4"
          onChange={(e) => setSubject(e.target.value)}
        />

        <MDBTextArea
          wrapperClass="mb-4"
          label={t("message")}
          onChange={(e) => setMessage(e.target.value)}
        />

        <MDBBtn color="primary" block className="my-4 " onClick={handleClick}>
          {t("send")}
        </MDBBtn>
      </form>
    </div>
  );
}
