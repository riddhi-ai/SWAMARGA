import React from 'react'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs'
import { Card } from '../../components/ui/Card'
import { Building, Building2, GraduationCap, Network } from 'lucide-react'

export const Collaborators: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="site-container py-8 space-y-8">
      <Breadcrumbs items={[{ label: t('nav.collaborators') }]} />

      <div className="border-b border-[#d9dde1] pb-4">
        <h1 className="text-3xl font-extrabold text-[var(--navy)] m-0">Ecosystem Collaborators</h1>
        <p className="text-sm text-[#5a6578] mt-1 mb-0 max-w-3xl">
          SWAMARGA connects educational institutions, vocational centers, industry employers, and public policy makers across Maharashtra.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Government Technical Institutes & Colleges">
          <div className="space-y-3 text-xs text-[#2d3748]">
            <p className="leading-relaxed m-0">
              Technical colleges and vocational institutes participate by integrating Experience Bridge tasks into practical lab sessions and tracking student competency passports.
            </p>
            <ul className="space-y-1.5 pl-4 list-disc text-[#5a6578]">
              <li>Government Polytechnic Institutes (Pune, Mumbai, Nagpur)</li>
              <li>Industrial Training Institutes (ITIs across 36 Maharashtra Districts)</li>
              <li>State University Technical Departments (SPPU, Mumbai University)</li>
            </ul>
          </div>
        </Card>

        <Card title="Industry Employer Partners">
          <div className="space-y-3 text-xs text-[#2d3748]">
            <p className="leading-relaxed m-0">
              Technology employers contribute by defining observable competency frameworks, validating student task submissions, and hiring verified talent directly.
            </p>
            <ul className="space-y-1.5 pl-4 list-disc text-[#5a6578]">
              <li>IT Infrastructure & Cloud Managed Service Providers</li>
              <li>DevOps & Enterprise Software Companies in Hinjawadi & Airoli</li>
              <li>Data Center Operations & Network Support Providers</li>
            </ul>
          </div>
        </Card>

        <Card title="Sector Skill Councils & Standardization Bodies">
          <div className="space-y-3 text-xs text-[#2d3748]">
            <p className="leading-relaxed m-0">
              National and state skill councils provide qualification pack mapping and occupational standard alignment.
            </p>
            <ul className="space-y-1.5 pl-4 list-disc text-[#5a6578]">
              <li>IT-ITeS Sector Skills Council</li>
              <li>National Council for Vocational Education and Training (NCVET) alignment</li>
              <li>Maharashtra State Board of Technical Education (MSBTE)</li>
            </ul>
          </div>
        </Card>

        <Card title="Public Policy & Labour Administration">
          <div className="space-y-3 text-xs text-[#2d3748]">
            <p className="leading-relaxed m-0">
              Government planning bodies use aggregated district demand-capacity signals to optimize seat allocations, trainer certifications, and lab funding.
            </p>
            <ul className="space-y-1.5 pl-4 list-disc text-[#5a6578]">
              <li>Directorate of Vocational Education & Training (DVET Maharashtra)</li>
              <li>District Skill Development Committees (DSDC)</li>
              <li>Maharashtra State Skill Development Society (MSSDS)</li>
            </ul>
          </div>
        </Card>
      </div>

      <div className="p-4 bg-[#f8fafc] border border-[#d9dde1] rounded text-xs text-[#5a6578]">
        <strong className="text-[var(--navy)] block mb-1">Collaboration Registration</strong>
        Accredited institutions and registered employers can request integration through the SWAMARGA verification queue.
      </div>
    </div>
  )
}
export default Collaborators
