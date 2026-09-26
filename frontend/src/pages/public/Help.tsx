import { useState } from 'react'

const faqs = [
  {
    q: 'Who can use SWAMARGA?',
    a: 'The planned platform has separate workspaces for candidates, training institutes, employers, government or district authorities, and administrators.',
  },
  {
    q: 'Does SWAMARGA only match candidates to jobs?',
    a: 'No. Candidate opportunity matching is one part of the proposed platform. It also connects labour-market signals with skill gaps, practical evidence, curriculum decisions, training capacity and employer feedback.',
  },
  {
    q: 'What is an evidence gap?',
    a: 'An evidence gap occurs when a competency may have been learned or claimed but has not yet been supported by appropriate practical evidence or validation.',
  },
  {
    q: 'Is the information on this prototype official government data?',
    a: 'No. Demonstration, seeded and illustrative data are identified where applicable. They should not be interpreted as official Maharashtra statistics.',
  },
  {
    q: 'Can government and administrator accounts be created publicly?',
    a: 'No. The planned access model uses provisioned accounts for government and administrator roles.',
  },
]

export default function Help() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="public-page">
      <section className="page-hero">
        <p className="eyebrow">Help</p>
        <h1>Find your way around SWAMARGA.</h1>
        <p>
          Information about the platform, access and the prototype data used
          for demonstrations.
        </p>
      </section>

      <section className="faq-section" aria-labelledby="faq-heading">
        <div className="content-label">
          <span id="faq-heading">Frequently asked questions</span>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = open === index

            return (
              <div className="faq-item" key={faq.q}>
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  <span>{faq.q}</span>
                  <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    className="faq-answer"
                  >
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      <section className="help-information">
        <article id="accessibility">
          <h2>Accessibility</h2>
          <p>
            The interface is being developed around semantic structure,
            keyboard access, visible focus, responsive reflow, readable
            contrast and support for reduced motion.
          </p>
        </article>

        <article id="privacy">
          <h2>Privacy</h2>
          <p>
            The current SIH prototype does not implement production
            authentication or a production identity system. Do not enter
            sensitive personal information into demonstration forms.
          </p>
        </article>

        <article id="data">
          <h2>Data &amp; methodology</h2>
          <p>
            The product concept combines labour-market signals, employer
            requirements, training information and outcome feedback. Prototype
            data is clearly distinguished from official statistics.
          </p>
        </article>
      </section>
    </div>
  )
}
