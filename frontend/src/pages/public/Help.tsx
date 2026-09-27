import React from 'react'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs'
import { Card } from '../../components/ui/Card'
import { HelpCircle, ChevronRight } from 'lucide-react'

export const Help: React.FC = () => {
  const { t } = useTranslation()

  const faqs = [
    {
      q: 'What is the difference between a Skill Gap and an Evidence Gap?',
      a: 'A Skill Gap indicates that a candidate has neither learned nor demonstrates a required competency. An Evidence Gap means that a candidate possesses conceptual familiarity or theoretical coursework, but lacks employer-verifiable practical evidence (e.g., system logs, command outputs, or scenario resolution artifacts).',
    },
    {
      q: 'How does the Experience Bridge work?',
      a: 'The Experience Bridge presents candidates with role-specific workplace troubleshooting scenarios. Upon executing the task and submitting technical evidence, automated benchmarks score the submission, which is then made available for employer partner validation.',
    },
    {
      q: 'What is the Competency Passport?',
      a: 'The Competency Passport is an authenticated digital record of a candidate’s demonstrated competencies, test scores, and employer validation history. It allows candidates to apply for jobs without relying on unverified claims.',
    },
    {
      q: 'Can training institutes integrate SWAMARGA into their curriculum?',
      a: 'Yes. Vocational institutes and polytechnic colleges use the Institute Workspace to map their course modules against live market demand, monitor course health, and utilize the What-If Capacity Simulator.',
    },
    {
      q: 'Are candidate scores shared publicly without consent?',
      a: 'No. Candidate competency passport records are confidential and shared only when the candidate formally submits an application or grants access to a verified employer.',
    },
  ]

  return (
    <div className="site-container py-8 space-y-8 animate-fade-in-up">
      <Breadcrumbs items={[{ label: t('nav.help') }]} />

      <div className="border-b border-[#d9dde1] pb-4">
        <h1 className="text-3xl font-extrabold text-[var(--navy)] m-0 flex items-center gap-2">
          <HelpCircle className="w-8 h-8 text-[var(--orange)]" />
          Help & Frequently Asked Questions
        </h1>
        <p className="text-sm text-[#5a6578] mt-1 mb-0 max-w-3xl">
          Guidance on how SWAMARGA diagnoses skill gaps, verifies evidence, and connects talent to industry.
        </p>
      </div>

      <div className="space-y-4 max-w-4xl">
        {faqs.map((faq, idx) => (
          <details key={idx} className="group bg-white border border-[#d9dde1] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <summary className="cursor-pointer p-4 font-bold text-[var(--navy)] flex items-center justify-between select-none list-none group-open:bg-[#f8fafc] group-open:border-b group-open:border-[#d9dde1] transition-colors">
              <span className="flex items-center gap-2">
                <span className="text-[var(--orange)] opacity-70">0{idx + 1}.</span> {faq.q}
              </span>
              <ChevronRight className="w-5 h-5 text-[#5a6578] transition-transform duration-300 group-open:rotate-90" />
            </summary>
            <div className="p-4 bg-white text-sm text-[#2d3748] leading-relaxed border-t border-transparent animate-fade-in">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
export default Help
