"use client";

import { useState } from "react";
import { budgetOptions, contactServices } from "./content";
import styles from "./page.module.css";

const CONTACT_FORM_ENDPOINT =
  process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT ||
  "https://script.google.com/macros/s/AKfycbzcUT1mbaop0267lK9-cYIv_oNNhH-iz4z9noGG_g9wT5p1SEIhK3KOWgdk80CCzv2ekw/exec";

const initialFormValues = {
  name: "",
  email: "",
  service: "",
  budgetIndex: 0,
  message: "",
};

function getFieldError(name, value) {
  const trimmedValue = typeof value === "string" ? value.trim() : value;

  if (name === "name" && !trimmedValue) {
    return "Name is required.";
  }

  if (name === "email") {
    if (!trimmedValue) {
      return "Email is required.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
      return "Enter a valid email address.";
    }
  }

  if (name === "service" && !trimmedValue) {
    return "Choose a service.";
  }

  if (name === "message" && !trimmedValue) {
    return "Tell me a little about the project.";
  }

  return "";
}

export default function ContactForm() {
  const [values, setValues] = useState(initialFormValues);
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const selectedBudget = budgetOptions[values.budgetIndex];

  function updateField(name, value) {
    setValues((current) => ({
      ...current,
      [name]: name === "budgetIndex" ? Number(value) : value,
    }));

    setFieldErrors((current) => {
      if (!current[name]) {
        return current;
      }

      const next = { ...current };
      const error = getFieldError(name, value);

      if (error) {
        next[name] = error;
      } else {
        delete next[name];
      }

      return next;
    });
  }

  function validateForm() {
    const nextErrors = {
      name: getFieldError("name", values.name),
      email: getFieldError("email", values.email),
      service: getFieldError("service", values.service),
      message: getFieldError("message", values.message),
    };

    Object.keys(nextErrors).forEach((key) => {
      if (!nextErrors[key]) {
        delete nextErrors[key];
      }
    });

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFeedback("");

    if (!validateForm()) {
      setStatus("error");
      setFeedback("Please fix the highlighted fields.");
      return;
    }

    if (CONTACT_FORM_ENDPOINT.includes("YOUR_DEPLOYMENT_ID")) {
      setStatus("error");
      setFeedback("Contact form endpoint is not configured locally.");
      return;
    }

    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      setValues(initialFormValues);
      setFieldErrors({});
      setStatus("success");
      setFeedback("Request sent. We will get back to you within 24 hours.");
    } catch (error) {
      setStatus("error");
      setFeedback(error.message || "Message could not be sent. Please try again.");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
      <div className={styles.formGrid}>
        <label className={styles.fieldGroup}>
          <input
            name="name"
            placeholder="Name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            onBlur={(event) =>
              setFieldErrors((current) => ({
                ...current,
                name: getFieldError("name", event.target.value),
              }))
            }
            aria-invalid={Boolean(fieldErrors.name)}
            required
            className={fieldErrors.name ? styles.fieldInvalid : undefined}
          />
          {fieldErrors.name ? <span className={styles.fieldError}>{fieldErrors.name}</span> : null}
        </label>
        <label className={styles.fieldGroup}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            onBlur={(event) =>
              setFieldErrors((current) => ({
                ...current,
                email: getFieldError("email", event.target.value),
              }))
            }
            aria-invalid={Boolean(fieldErrors.email)}
            required
            className={fieldErrors.email ? styles.fieldInvalid : undefined}
          />
          {fieldErrors.email ? (
            <span className={styles.fieldError}>{fieldErrors.email}</span>
          ) : null}
        </label>
      </div>
      <div className={styles.formGrid}>
        <label className={styles.fieldGroup}>
          <select
            name="service"
            value={values.service}
            onChange={(event) => updateField("service", event.target.value)}
            onBlur={(event) =>
              setFieldErrors((current) => ({
                ...current,
                service: getFieldError("service", event.target.value),
              }))
            }
            aria-invalid={Boolean(fieldErrors.service)}
            required
            className={fieldErrors.service ? styles.fieldInvalid : undefined}
          >
            <option value="" disabled>
              Choose Service
            </option>
            {contactServices.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {fieldErrors.service ? (
            <span className={styles.fieldError}>{fieldErrors.service}</span>
          ) : null}
        </label>
        <div className={styles.budgetSliderField}>
          <div className={styles.budgetSliderHeader}>
            <span>Budget Range</span>
            <strong>{selectedBudget}</strong>
          </div>
          <input type="hidden" name="budget" value={selectedBudget} />
          <input
            type="range"
            min="0"
            max={budgetOptions.length - 1}
            step="1"
            value={values.budgetIndex}
            onChange={(event) => updateField("budgetIndex", event.target.value)}
            className={styles.budgetSlider}
            aria-label="Budget range"
          />
          <div className={styles.budgetStops} aria-hidden="true">
            {budgetOptions.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
      <label className={styles.fieldGroup}>
        <textarea
          rows="6"
          name="message"
          placeholder="Tell me about your project and brand"
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          onBlur={(event) =>
            setFieldErrors((current) => ({
              ...current,
              message: getFieldError("message", event.target.value),
            }))
          }
          aria-invalid={Boolean(fieldErrors.message)}
          required
          className={fieldErrors.message ? styles.fieldInvalid : undefined}
        />
        {fieldErrors.message ? (
          <span className={styles.fieldError}>{fieldErrors.message}</span>
        ) : null}
      </label>
      <button
        type="submit"
        className={`${styles.primaryButton} ${styles.submitButton} ${
          status === "success" ? styles.submitButtonSent : ""
        }`}
        data-ga-event="send_message_click"
        data-ga-label="contact_form_send"
        data-ga-location="contact"
        disabled={isSubmitting}
      >
        <span>{isSubmitting ? "Sending..." : status === "success" ? "Sent" : "Send Message"}</span>
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
