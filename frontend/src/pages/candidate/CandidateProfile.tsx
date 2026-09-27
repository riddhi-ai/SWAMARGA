import React from 'react'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { DEMO_CANDIDATE } from '../../services/mockData'
import { User, Mail, MapPin, Briefcase } from 'lucide-react'

export const CandidateProfile: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: t('nav.overview'), to: '/candidate' },
          { label: t('nav.profile') },
        ]}
      />

      <div className="border-b border-[#d9dde1] pb-4">
        <h1 className="text-2xl font-bold text-[var(--navy)] m-0">{t('nav.profile')}</h1>
        <p className="text-sm text-[#5a6578] mt-1 mb-0">
          Personal credentials, target career aspiration, and verified resume profile.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-6">
          <Card title="Candidate Identity">
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2 text-[#202124]">
                <User className="w-4 h-4 text-[var(--navy)]" />
                <span className="font-bold text-sm">{DEMO_CANDIDATE.name}</span>
              </div>
              <div className="flex items-center gap-2 text-[#5a6578]">
                <Mail className="w-4 h-4" />
                <span>{DEMO_CANDIDATE.email}</span>
              </div>
              <div className="flex items-center gap-2 text-[#5a6578]">
                <MapPin className="w-4 h-4" />
                <span>{DEMO_CANDIDATE.location}</span>
              </div>
              <div className="flex items-center gap-2 text-[#5a6578]">
                <Briefcase className="w-4 h-4" />
                <span className="font-semibold text-[var(--navy)]">{DEMO_CANDIDATE.target_role}</span>
              </div>
            </div>
          </Card>

          <Card title="Education & Qualifications">
            <div className="text-xs space-y-2 text-[#2d3748]">
              <div>
                <span className="font-bold block text-[var(--navy)]">Master of Computer Applications (MCA)</span>
                <span className="text-[#5a6578]">Savitribai Phule Pune University (2024 - 2026)</span>
              </div>
              <div className="pt-2 border-t border-[#eef1f3]">
                <span className="font-bold block text-[var(--navy)]">B.Sc. Computer Science</span>
                <span className="text-[#5a6578]">Pune University (Graduated 2024)</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card title="Parsed Technical Resume Profile">
            <div className="bg-[#f8fafc] border border-[#d9dde1] p-4 rounded text-xs font-mono text-[#2d3748] leading-relaxed mb-4">
              {DEMO_CANDIDATE.resume_text}
            </div>

            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--navy)] mb-2">
              Detected Skills Extracted by Engine
            </h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="verified">Linux (Verified)</Badge>
              <Badge variant="verified">Troubleshooting (Verified)</Badge>
              <Badge variant="evidenceGap">AWS (Needs Practical Proof)</Badge>
              <Badge variant="skillGap">Networking (Skill Gap)</Badge>
              <Badge variant="skillGap">Docker (Skill Gap)</Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
export default CandidateProfile
