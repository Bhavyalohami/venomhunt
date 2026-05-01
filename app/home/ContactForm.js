"use client";

import { useState } from "react";
import { budgetOptions, contactServices } from "./content";
import styles from "./page.module.css";

const CONTACT_FORM_ENDPOINT =
  process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT ||
  "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("submitting");
    setFeedback("");

    if (CONTACT_FORM_ENDPOINT.includes("YOUR_DEPLOYMENT_ID")) {
      setStatus("error");
      setFeedback("Contact form endpoint is not configured yet.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      form.reset();
      setStatus("success");
      setFeedback("Message sent. We will get back to you within 24 hours.");
    } catch (error) {
      setStatus("error");
      setFeedback(error.message || "Message could not be sent. Please try again.");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <div className={styles.formGrid}>
        <input name="name" placeholder="Name" autoComplete="name" required />
        <input type="email" name="email" placeholder="Email" autoComplete="email" required />
      </div>
      <div className={styles.formGrid}>
        <select name="service" defaultValue="" required>
          <option value="" disabled>
            Choose Service
          </option>
          {contactServices.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select name="budget" defaultValue="" required>
          <option value="" disabled>
            Budget Range
          </option>
          {budgetOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <textarea
        rows="6"
        name="message"
        placeholder="Tell me about your project and brand"
        required
      />
      <button
        type="submit"
        className={styles.primaryButton}
        data-ga-event="send_message_click"
        data-ga-label="contact_form_send"
        data-ga-location="contact"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
      {feedback ? (
        <p
          className={`${styles.formStatus} ${
            status === "success" ? styles.formStatusSuccess : styles.formStatusError
          }`}
          role={status === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          {feedback}
        </p>
      ) : null}
    </form>
  );
}
