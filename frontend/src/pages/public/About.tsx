import React from 'react'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs'
import { Card } from '../../components/ui/Card'
import { ShieldCheck, Award, Target, Landmark } from 'lucide-react'

export const About: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="site-container py-8 space-y-8 animate-fade-in-up">
      <Breadcrumbs items={[{ label: t('nav.about') }]} />

      <div className="border-b border-[#d9dde1] pb-4">
        <div className="flex items-center gap-2 mb-1">
          <Landmark className="w-4 h-4 text-[var(--orange)]" />
          <span className="text-xs uppercase font-bold text-[#5a6578]">Public Mission</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[var(--navy)] m-0">About SWAMARGA</h1>
        <p className="text-sm text-[#5a6578] mt-1 mb-0 max-w-3xl">
          {t('common.fullName')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card title="Vision & Purpose">
            <p className="text-xs text-[#2d3748] leading-relaxed mb-3">
              SWAMARGA was conceived as a digital public infrastructure prototype to address one of the most persistent bottlenecks in vocational education and technical hiring across Maharashtra: the gap between certified classroom learning and verified, job-ready capability.
            </p>
            <p className="text-xs text-[#2d3748] leading-relaxed mb-3">
              Rather than relying on unverified resumes or self-reported claims, SWAMARGA establishes a transparent, closed-loop feedback mechanism connecting employer job demands directly to practical simulation evidence and state training capacity adjustments.
            </p>
            <p className="text-xs text-[#2d3748] leading-relaxed">
              By introducing the <strong>Evidence Gap Engine</strong>, the platform distinguishes candidates who lack skills from those who simply lack employer-verifiable proof of their abilities.
            </p>
          </Card>

          <Card title="Core Architectural Pillars">
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-[var(--orange)] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[var(--navy)] mb-1">1. Demand-to-Action Mapping</h4>
                  <p className="text-[#5a6578] m-0">
                    Live industry hiring requisitions in key Maharashtra employment clusters (Pune, Mumbai, Nagpur) are parsed into standardized technical competencies.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-[#3e9b45] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[var(--navy)] mb-1">2. Experience Bridge Simulation</h4>
                  <p className="text-[#5a6578] m-0">
                    Students and jobseekers execute authenticated workplace scenarios to bridge evidence gaps without requiring prior formal employment.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[var(--navy)] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[var(--navy)] mb-1">3. Employer-Validated Competency Passport</h4>
                  <p className="text-[#5a6578] m-0">
                    Demonstrated capabilities receive formal attestation from verified industry partners, creating an immutable competency record for recruitment.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Institutional Framework">
            <div className="text-xs space-y-3 text-[#2d3748]">
              <div>
                <span className="font-bold text-[#5a6578] block">State Initiative</span>
                <span className="font-semibold text-[var(--navy)]">Government of Maharashtra</span>
              </div>
              <div className="pt-2 border-t border-[#eef1f3]">
                <span className="font-bold text-[#5a6578] block">Focus Sector</span>
                <span className="font-semibold text-[#202124]">Information Technology, Cloud Infrastructure & Engineering</span>
              </div>
              <div className="pt-2 border-t border-[#eef1f3]">
                <span className="font-bold text-[#5a6578] block">Design System</span>
                <span className="font-semibold text-[#202124]">UX4G Design System 3.0 Guidelines</span>
              </div>
              <div className="pt-2 border-t border-[#eef1f3]">
                <span className="font-bold text-[#5a6578] block">Accessibility</span>
                <span className="font-semibold text-[#202124]">Targeting WCAG 2.2 Level AA</span>
              </div>
            </div>
          </Card>

          <div className="p-4 bg-[#f8fafc] border border-[#d9dde1] rounded text-xs text-[#5a6578]">
            <strong className="text-[var(--navy)] block mb-1">Ethical Data Standard</strong>
            Data shown throughout this demonstration platform is sourced and curated for prototype evaluation. No figures are presented as official gazetted statistics.
          </div>
        </div>
      </div>
    </div>
  )
}
export default About
