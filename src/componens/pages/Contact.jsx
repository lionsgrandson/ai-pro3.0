import React, { useState, useEffect } from "react";
import { MDBInput, MDBBtn, MDBTextArea } from "mdb-react-ui-kit";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import firstImage from "../../assets/firstVideoFrame.png"; // Updated import path

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { t } = useTranslation();

  const style = {
    height: "80vmin",
    minHeight: "500px",
    backgroundImage: `url(${firstImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  useEffect(() => {
    emailjs.init("aS_Kd2on0E1C1dTBv"); // Replace with your EmailJS public key
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic form validation
    if (!name || !email || !subject || !message) {
      setError(t("All fields are required"));
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(t("Invalid email address"));
      return;
    }

    const serviceId = "service_f6s9o6x"; // Replace with your EmailJS service ID
    const templateId = "template_jux7c9h"; // Replace with your EmailJS template ID

    try {
      setLoading(true);
      await emailjs.send(serviceId, templateId, {
        name,
        email,
        subject,
        message,
      });
      setSuccess(t("Email sent successfully!"));
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setError(t("Failed to send email. Please try again."));
      console.error("EmailJS error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-12" style={style}>
      <form
        id="contact-form"
        className="text-center"
        style={{
          width: "100%",
          maxWidth: "400px",
          fontStyle: "italic",
        }}
        onSubmit={handleSubmit}
      >
        <h1 className="mb-4">{t("contact")}</h1>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <MDBInput
          label={t("name")}
          value={name}
          wrapperClass="mb-4"
          contrast
          onChange={(e) => setName(e.target.value)}
          required
        />

        <MDBInput
          type="email"
          label={t("email")}
          value={email}
          wrapperClass="mb-4"
          contrast
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <MDBInput
          label={t("subject")}
          value={subject}
          wrapperClass="mb-4"
          contrast
          onChange={(e) => setSubject(e.target.value)}
          required
        />

        <MDBTextArea
          label={t("message")}
          value={message}
          wrapperClass="mb-4"
          contrast
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <MDBBtn color="primary" block type="submit" disabled={loading}>
          {loading ? t("דending") : t("send")}
        </MDBBtn>
      </form>
    </div>
  );
}
