import { useState } from 'react'
import type { FormEvent } from 'react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="public-page">
      <section className="page-hero">
        <p className="eyebrow">Contact</p>
        <h1>Questions about the platform?</h1>
        <p>
          Send a message about the prototype, accessibility, collaboration or
          general platform information.
        </p>
      </section>

      <section className="contact-layout">
        <div className="contact-information">
          <div className="content-label">Get in touch</div>
          <h2>Tell us what you need.</h2>
          <p>
            This contact form is currently a prototype and does not send
            messages to an external service.
          </p>

          <div className="contact-note">
            <strong>Prototype notice</strong>
            <p>
              Do not submit passwords, government identifiers, financial
              information or other sensitive personal information.
            </p>
          </div>
        </div>

        <form className="public-form" onSubmit={handleSubmit}>
          {submitted && (
            <div className="form-success" role="status">
              Your message has been recorded for this prototype session.
            </div>
          )}

          <div className="form-field">
            <label htmlFor="contact-name">Name</label>
            <input id="contact-name" name="name" autoComplete="name" required />
          </div>

          <div className="form-field">
            <label htmlFor="contact-email">Email address</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="contact-topic">Topic</label>
            <select id="contact-topic" name="topic" defaultValue="">
              <option value="" disabled>
                Select a topic
              </option>
              <option>Platform information</option>
              <option>Accessibility</option>
              <option>Collaboration</option>
              <option>General enquiry</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              required
            />
          </div>

          <button type="submit" className="button button-primary">
            Submit enquiry
          </button>
        </form>
      </section>
    </div>
  )
}
