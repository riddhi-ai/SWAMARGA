import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Alert } from '../../components/ui/Alert'
import { MapPin, Mail, Phone, Clock, Send } from 'lucide-react'

export const Contact: React.FC = () => {
  const { t } = useTranslation()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="site-container py-8 space-y-8">
      <Breadcrumbs items={[{ label: t('nav.contact') }]} />

      <div className="border-b border-[#d9dde1] pb-4">
        <h1 className="text-3xl font-extrabold text-(--navy) m-0">Contact & Support Desk</h1>
        <p className="text-sm text-[#5a6578] mt-1 mb-0 max-w-3xl">
          Get in touch with the SWAMARGA platform support administration in Maharashtra.
        </p>
      </div>

      {submitted && (
        <Alert variant="success" title="Inquiry Dispatched">
          Your inquiry has been recorded. The support desk will review and respond to your registered email address.
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-6">
          <Card title="Official Contact Channels">
            <div className="space-y-4 text-xs text-[#2d3748]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-(--orange) shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-(--navy)">Administrative Node</strong>
                  <span>SWAMARGA Workforce Intelligence Unit, Pune Center, Shivajinagar, Pune, Maharashtra 411005</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-(--navy) shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-(--navy)">Electronic Mail</strong>
                  <span>support.swamarga@maharashtra.gov.in (Prototype desk)</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#3e9b45] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-(--navy)">Support Hours</strong>
                  <span>Monday through Friday: 09:30 AM to 05:30 PM IST</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card title="Submit Support / Grievance Inquiry">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-[#202124] mb-1">
                    Your Name <span className="text-[#d9383a]">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Enter full name"
                    className="w-full p-2.5 border border-[#d9dde1] rounded text-xs bg-[#f8fafc]"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-[#202124] mb-1">
                    Official Email <span className="text-[#d9383a]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="w-full p-2.5 border border-[#d9dde1] rounded text-xs bg-[#f8fafc]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="category" className="block text-xs font-bold text-[#202124] mb-1">
                  Stakeholder Category
                </label>
                <select
                  id="category"
                  className="w-full p-2.5 border border-[#d9dde1] rounded text-xs bg-[#f8fafc]"
                >
                  <option value="candidate">Candidate / Jobseeker</option>
                  <option value="institute">Training Institute / ITI</option>
                  <option value="employer">Employer / Recruiter</option>
                  <option value="government">Government Official</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold text-[#202124] mb-1">
                  Inquiry Details <span className="text-[#d9383a]">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  placeholder="Specify query regarding task verification, institution onboarding, or technical assistance..."
                  className="w-full p-2.5 border border-[#d9dde1] rounded text-xs bg-[#f8fafc]"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  leftIcon={<Send className="w-4 h-4" />}
                >
                  Dispatch Inquiry
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
export default Contact


