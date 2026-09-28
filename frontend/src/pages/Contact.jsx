import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveContactSubmission } from "../constants/contactStorage";

const INITIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  contactNumber: "",
  emailAddress: "",
  message: "",
};

/**
 * Contact page: info panel + interactive form.
 * Captures user input (sessionStorage) and redirects to Home on success.
 */
function Contact() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(INITIAL_FORM_STATE);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormValues((previousValues) => ({
      ...previousValues,
      [name]: value,
    }));

    if (formError) {
      setFormError("");
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setFormError("");

      const trimmedValues = {
        firstName: formValues.firstName.trim(),
        lastName: formValues.lastName.trim(),
        contactNumber: formValues.contactNumber.trim(),
        emailAddress: formValues.emailAddress.trim(),
        message: formValues.message.trim(),
      };

      const hasEmptyRequiredField = Object.values(trimmedValues).some(
        (fieldValue) => !fieldValue
      );

      if (hasEmptyRequiredField) {
        setFormError("Please complete all fields before sending.");
        return;
      }

      // Basic email shape check — keeps the form usable without a backend
      const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        trimmedValues.emailAddress
      );
      if (!emailLooksValid) {
        setFormError("Please enter a valid email address.");
        return;
      }

      const submissionPayload = {
        ...trimmedValues,
        submittedAt: new Date().toISOString(),
      };

      const didSaveSubmission = saveContactSubmission(submissionPayload);
      if (!didSaveSubmission) {
        setFormError(
          "Your browser blocked saving the message. Please try again or use email directly."
        );
        return;
      }

      // Assignment requirement: capture input, then redirect to Home
      navigate("/", { replace: true, state: { contactSubmitted: true } });
    } catch (submitError) {
      console.error("Contact form submission failed:", submitError);
      setFormError(
        "Something went wrong while sending your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main>
      <header className="page-hero">
        <p className="section-label">Contact</p>
        <h1 className="section-title">Let’s talk</h1>
        <p className="page-hero-lead">
          Share a short note about your project. This form captures your details
          and returns you to the home page after submit.
        </p>
      </header>

      <div className="site-main">
        <section
          className="contact-layout"
          aria-labelledby="contact-form-heading"
        >
          {/* Contact information panel */}
          <aside className="contact-panel" aria-label="Contact information">
            <p className="section-label">Details</p>
            <h2 className="contact-panel-title" id="contact-info-heading">
              Contact information
            </h2>
            <ul className="contact-details">
              <li>
                <span className="contact-detail-label">Name</span>
                <span>Kingsley Ihekwaba</span>
              </li>
              <li>
                <span className="contact-detail-label">Role</span>
                <span>Mobile Engineer</span>
              </li>
              <li>
                <span className="contact-detail-label">Email</span>
                <a href="mailto:kingsleyihekwaba208@gmail.com">
                  kingsleyihekwaba208@gmail.com
                </a>
              </li>
              <li>
                <span className="contact-detail-label">Phone</span>
                <a href="tel:+15551234567">+1 (437) 453-1604</a>
              </li>
              <li>
                <span className="contact-detail-label">Location</span>
                <span>Toronto, Canada</span>
              </li>
            </ul>
          </aside>

          {/* Interactive message form */}
          <div className="contact-form-wrap">
            <p className="section-label">Message</p>
            <h2 className="section-title" id="contact-form-heading">
              Send a message
            </h2>

            <form
              className="contact-form"
              onSubmit={handleFormSubmit}
              noValidate
            >
              <div className="form-row">
                <label className="form-field" htmlFor="firstName">
                  <span>First Name</span>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={formValues.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </label>

                <label className="form-field" htmlFor="lastName">
                  <span>Last Name</span>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={formValues.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>

              <div className="form-row">
                <label className="form-field" htmlFor="contactNumber">
                  <span>Contact Number</span>
                  <input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    autoComplete="tel"
                    value={formValues.contactNumber}
                    onChange={handleInputChange}
                    required
                  />
                </label>

                <label className="form-field" htmlFor="emailAddress">
                  <span>Email Address</span>
                  <input
                    id="emailAddress"
                    name="emailAddress"
                    type="email"
                    autoComplete="email"
                    value={formValues.emailAddress}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>

              <label className="form-field" htmlFor="message">
                <span>Message</span>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formValues.message}
                  onChange={handleInputChange}
                  required
                />
              </label>

              {formError ? (
                <p className="form-error" role="alert">
                  {formError}
                </p>
              ) : null}

              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending…" : "Send message"}
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Contact;
