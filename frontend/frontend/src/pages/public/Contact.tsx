import { useState } from 'react'
import type { FormEvent } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <div className="site-width standard-page">
      <header className="page-intro">
        <div className="page-eyebrow">Contact</div>
        <h1>Questions, feedback or access support.</h1>
        <p>Use the form below for the SWAMARGA prototype.</p>
      </header>

      <div className="contact-grid">
        <form className="service-form" onSubmit={submit}>
          {sent && <div className="form-success" role="status">Your message has been recorded for this prototype.</div>}

          <label>
            Name
            <input required name="name" autoComplete="name" />
          </label>

          <label>
            Email
            <input required type="email" name="email" autoComplete="email" />
          </label>

          <label>
            Subject
            <select name="subject" defaultValue="">
              <option value="" disabled>Select a subject</option>
              <option>Access help</option>
              <option>Platform feedback</option>
              <option>Data question</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            Message
            <textarea required name="message" rows={6} />
          </label>

          <button className="primary-button" type="submit">Send message</button>
        </form>

        <aside className="contact-note">
          <span>SWAMARGA</span>
          <h2>Public workforce service prototype</h2>
          <p>
            This contact form is a demonstration interface and does not represent
            a live government helpdesk.
          </p>
        </aside>
      </div>
    </div>
  )
}
