import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <section className="gov-page-heading">
        <div className="gov-container">
          <p className="gov-breadcrumb">
            <Link to="/">Home</Link> / Contact
          </p>
          <h1>Contact &amp; feedback</h1>
          <p>Send a query or feedback about the SWAMARGA prototype.</p>
        </div>
      </section>

      <div className="gov-container contact-layout">
        <section className="gov-contact-info">
          <h2>Contact information</h2>
          <p>
            Use this form for prototype-related queries, accessibility
            feedback or suggestions.
          </p>

          <dl>
            <div>
              <dt>Platform</dt>
              <dd>SWAMARGA</dd>
            </div>
            <div>
              <dt>Problem statement</dt>
              <dd>SIH 2026, PS 26134</dd>
            </div>
            <div>
              <dt>Purpose</dt>
              <dd>Skill and workforce alignment</dd>
            </div>
          </dl>
        </section>

        <section className="gov-form-section">
          <h2>Send feedback</h2>

          {submitted && (
            <div className="gov-form-success" role="status">
              Your feedback has been recorded for this prototype demonstration.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="gov-form-field">
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" name="name" autoComplete="name" required />
            </div>

            <div className="gov-form-field">
              <label htmlFor="contact-email">Email address</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </div>

            <div className="gov-form-field">
              <label htmlFor="contact-subject">Subject</label>
              <input id="contact-subject" name="subject" required />
            </div>

            <div className="gov-form-field">
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" name="message" rows={6} required />
            </div>

            <button type="submit" className="gov-primary-button">
              Submit feedback
            </button>
          </form>
        </section>
      </div>
    </>
  )
}



