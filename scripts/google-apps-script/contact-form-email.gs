const CONTACT_FORM_RECIPIENT = "pranavlohani@theopeners.in";

function doPost(e) {
  try {
    const data = getContactFormData_(e);
    const fields = {
      name: data.name || "",
      email: data.email || "",
      service: data.service || "",
      budget: data.budget || "",
      message: data.message || "",
    };

    MailApp.sendEmail({
      to: CONTACT_FORM_RECIPIENT,
      replyTo: fields.email || undefined,
      subject: "New VenomHunt contact form submission",
      body: buildContactEmailBody_(fields),
    });

    return jsonResponse_({ ok: true });
  } catch (error) {
    return jsonResponse_(
      {
        ok: false,
        error: error && error.message ? error.message : "Unable to process submission.",
      },
      500
    );
  }
}

function doGet() {
  return jsonResponse_({ ok: true, service: "venomhunt-contact-form" });
}

function doOptions() {
  return jsonResponse_({ ok: true });
}

function getContactFormData_(e) {
  if (!e) {
    return {};
  }

  if (e.parameter && Object.keys(e.parameter).length) {
    return e.parameter;
  }

  const contents = e.postData && e.postData.contents;
  if (!contents) {
    return {};
  }

  try {
    return JSON.parse(contents);
  } catch (error) {
    return {};
  }
}

function buildContactEmailBody_(fields) {
  const submittedAt = Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    "yyyy-MM-dd HH:mm:ss z"
  );

  return [
    "New VenomHunt contact form submission",
    "",
    "Name: " + fields.name,
    "Email: " + fields.email,
    "Service: " + fields.service,
    "Budget: " + fields.budget,
    "",
    "Message:",
    fields.message,
    "",
    "Submitted at: " + submittedAt,
  ].join("\n");
}

function jsonResponse_(payload, statusCode) {
  const body = JSON.stringify({
    status: statusCode || 200,
    ...payload,
  });

  return ContentService.createTextOutput(body).setMimeType(ContentService.MimeType.JSON);
}
