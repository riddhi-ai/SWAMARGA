import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Alert } from '../../components/ui/Alert'
import { Button } from '../../components/ui/Button'
import { DEMO_JOBS } from '../../services/mockData'
import { ArrowLeft, Building2, MapPin } from 'lucide-react'

export const JobDetail: React.FC = () => {
  const { t } = useTranslation()
  const { jobId } = useParams<{ jobId: string }>()
  const idNum = parseInt(jobId || '1', 10)
  const job = DEMO_JOBS.find((j) => j.id === idNum) || DEMO_JOBS[0]

  const [applied, setApplied] = useState(false)

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: t('nav.overview'), to: '/candidate' },
          { label: t('nav.jobs'), to: '/candidate/jobs' },
          { label: job.title },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#d9dde1] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-bold text-[#5a6578]">
              Role Specification
            </span>
            <Badge variant="neutral">{job.location}</Badge>
          </div>
          <h1 className="text-2xl font-bold text-[var(--navy)] m-0">{job.title}</h1>
          <div className="flex items-center gap-3 text-xs text-[#5a6578] mt-1">
            <span className="font-semibold text-[#202124] flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              {job.company}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {job.location}
            </span>
          </div>
        </div>

        <Link
          to="/candidate/jobs"
          className="gov-btn gov-btn-secondary gov-btn-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Back to Jobs
        </Link>
      </div>

      {applied && (
        <Alert variant="success" title="Application Submitted with Competency Passport">
          Your verified credentials and practical score history have been dispatched to {job.company}. You will receive status updates in your Applications tracker.
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Role Overview & Technical Scope">
            <p className="text-xs text-[#2d3748] leading-relaxed mb-4">
              {job.description}
            </p>

            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--navy)] mb-2">
              Mandatory Competencies Demanded
            </h4>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {job.skills?.map((s) => (
                <span
                  key={s}
                  className="bg-[#f1f3f5] text-[var(--navy)] px-2.5 py-1 rounded text-xs font-semibold border border-[#d9dde1]"
                >
                  {s}
                </span>
              ))}
            </div>

            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--navy)] mb-2">
              Explainable Match Rationale
            </h4>
            <p className="text-xs text-[#2d3748] leading-relaxed bg-[#f8fafc] p-3 rounded border border-[#eef1f3]">
              {job.match_rationale}
            </p>
          </Card>
        </div>

        {/* Right col */}
        <div className="space-y-6">
          <Card title="Candidate Readiness Alignment">
            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-[#2e7a34] block mb-1">
                  Verified by Passport:
                </span>
                <ul className="space-y-1 pl-4 list-disc text-[#2d3748]">
                  <li>Linux System Recovery (Score: 84)</li>
                  <li>Incident Troubleshooting (Score: 88)</li>
                </ul>
              </div>

              <div className="pt-2 border-t border-[#eef1f3]">
                <span className="font-bold text-[var(--orange-dark)] block mb-1">
                  Evidence Gaps to Clear:
                </span>
                <p className="text-[#5a6578] m-0">
                  AWS practical scenario on Experience Bridge.
                </p>
              </div>

              <div className="pt-4 border-t border-[#eef1f3]">
                <Button
                  variant="primary"
                  className="w-full"
                  disabled={applied}
                  onClick={() => setApplied(true)}
                >
                  {applied ? 'Application Dispatched' : 'Apply with Competency Passport'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
export default JobDetail
