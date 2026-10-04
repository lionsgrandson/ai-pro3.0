import React, { useState, useEffect, useRef } from "react";
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
  const submissionInProgress = useRef(false);

  const { t } = useTranslation();

  const style = {
    backgroundImage: `linear-gradient(rgba(0,0,0,.65), rgba(0,0,0,.65)), url(${firstImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  useEffect(() => {
    emailjs.init({
      publicKey: "Caz3jbRmhcS9bc1wD",
      // Match EmailJS's one-request-per-second limit without using account quota.
      limitRate: { id: "ai-pro-contact", throttle: 1000 },
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submissionInProgress.current) return;
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

    const serviceId = "service_198gv7r"; // Replace with your EmailJS service ID
    const templateId = "template_unhwwxa"; // Replace with your EmailJS template ID

    try {
      submissionInProgress.current = true;
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
    } finally {
      submissionInProgress.current = false;
      setLoading(false);
    }
  };

  return (
    <div className="col-12 contactSection" style={style}>
      <form
        id="contact-form"
        aria-labelledby="contact-heading"
        aria-busy={loading}
        className="contactForm"
        onSubmit={handleSubmit}
      >
        <h1 id="contact-heading" className="mb-4">{t("contact")}</h1>

        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        {success && <div className="alert alert-success" role="status">{success}</div>}

        <div className="contactFields">
          <div className="contactField">
            <label htmlFor="contact-name">{t("name")}</label>
            <input id="contact-name" name="name" autoComplete="name"
              value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="contactField">
            <label htmlFor="contact-email">{t("email")}</label>
            <input id="contact-email" name="email" autoComplete="email" type="email" dir="ltr"
              value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="contactField contactFieldFull">
            <label htmlFor="contact-subject">{t("subject")}</label>
            <input id="contact-subject" name="subject"
              value={subject} onChange={(e) => setSubject(e.target.value)} required />
          </div>
          <div className="contactField contactFieldFull">
            <label htmlFor="contact-message">{t("message")}</label>
            <textarea id="contact-message" name="message" rows={6}
              value={message} onChange={(e) => setMessage(e.target.value)} required />
          </div>
        </div>
        <button className="contactSubmit" type="submit" disabled={loading}>
          {loading ? t("sending") : t("send")}
        </button>
      </form>
    </div>
  );
}
