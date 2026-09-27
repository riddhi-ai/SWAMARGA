import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Table, Column } from '../../components/ui/Table'
import { Alert } from '../../components/ui/Alert'
import { DEMO_COMPETENCY_MATRIX } from '../../services/mockData'
import { CompetencyStatusRow } from '../../types'
import { ArrowRight, CheckCircle2, HelpCircle, AlertCircle, XCircle } from 'lucide-react'

export const SkillEvidenceGap: React.FC = () => {
  const { t } = useTranslation()
  const [data] = useState<CompetencyStatusRow[]>(DEMO_COMPETENCY_MATRIX)

  const columns: Column<CompetencyStatusRow>[] = [
    {
      header: 'Required Competency',
      accessor: (row) => (
        <div>
          <span className="font-bold text-[var(--navy)] block text-sm">{row.skill}</span>
          <span className="text-[11px] text-[#5a6578]">Target: Cloud Support Associate</span>
        </div>
      ),
    },
    {
      header: 'Skill Status (Knowledge)',
      accessor: (row) => {
        if (row.skillStatus === 'Demonstrated') {
          return (
            <Badge variant="verified">
              {t('common.demonstrated')}
            </Badge>
          )
        }
        return (
          <Badge variant="skillGap">
            {t('common.skillGap')}
          </Badge>
        )
      },
    },
    {
      header: 'Evidence Status (Proof)',
      accessor: (row) => {
        if (row.evidenceStatus === 'Verified') {
          return (
            <Badge variant="verified">
              {t('common.verified')} ({row.score}/100)
            </Badge>
          )
        }
        if (row.evidenceStatus === 'Evidence Gap') {
          return (
            <Badge variant="evidenceGap">
              {t('common.evidenceGap')}
            </Badge>
          )
        }
        return (
          <Badge variant="neutral">
            {t('common.notDemonstrated')}
          </Badge>
        )
      },
    },
    {
      header: 'Recorded Evidence / Source',
      accessor: (row) => (
        <span className="text-xs text-[#2d3748]">
          {row.evidenceType}
        </span>
      ),
    },
    {
      header: 'Actionable Next Step',
      accessor: (row) => (
        <Link
          to={row.actionUrl}
          className="inline-flex items-center gap-1 text-xs font-bold text-[var(--navy)] hover:text-[var(--orange)]"
        >
          <span>{row.recommendedAction}</span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
        </Link>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: t('nav.overview'), to: '/candidate' },
          { label: t('nav.skillEvidenceGap') },
        ]}
      />

      <div className="border-b border-[#d9dde1] pb-4">
        <h1 className="text-2xl font-bold text-[var(--navy)] m-0">
          {t('gapAnalysis.title')}
        </h1>
        <p className="text-sm text-[#5a6578] mt-1 mb-0">
          {t('gapAnalysis.subtitle')}
        </p>
      </div>

      {/* DEFINITION & CLASSIFICATION PRINCIPLES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border-2 border-[#3e9b45] p-4 rounded shadow-2xs">
          <div className="flex items-center gap-2 mb-2 text-[#2e7a34]">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="text-sm font-bold m-0 uppercase tracking-wide">
              1. Verified Competency
            </h3>
          </div>
          <p className="text-xs text-[#2d3748] m-0 leading-relaxed">
            {t('gapAnalysis.demonstratedMeaning')}
          </p>
          <div className="mt-3 pt-2 border-t border-[#eef1f3] text-[11px] font-semibold text-[#2e7a34]">
            Candidate Status: Linux (84%), Troubleshooting (88%)
          </div>
        </div>

        <div className="bg-white border-2 border-[var(--orange)] p-4 rounded shadow-2xs">
          <div className="flex items-center gap-2 mb-2 text-[var(--orange-dark)]">
            <AlertCircle className="w-5 h-5" />
            <h3 className="text-sm font-bold m-0 uppercase tracking-wide">
              2. Evidence Gap
            </h3>
          </div>
          <p className="text-xs text-[#2d3748] m-0 leading-relaxed">
            {t('gapAnalysis.evidenceGapMeaning')}
          </p>
          <div className="mt-3 pt-2 border-t border-[#eef1f3] text-[11px] font-semibold text-[var(--orange-dark)]">
            Candidate Status: AWS (Course Certificate on file)
          </div>
        </div>

        <div className="bg-white border-2 border-[#d9383a] p-4 rounded shadow-2xs">
          <div className="flex items-center gap-2 mb-2 text-[#d9383a]">
            <XCircle className="w-5 h-5" />
            <h3 className="text-sm font-bold m-0 uppercase tracking-wide">
              3. Skill Gap
            </h3>
          </div>
          <p className="text-xs text-[#2d3748] m-0 leading-relaxed">
            {t('gapAnalysis.skillGapMeaning')}
          </p>
          <div className="mt-3 pt-2 border-t border-[#eef1f3] text-[11px] font-semibold text-[#d9383a]">
            Candidate Status: Networking, Docker
          </div>
        </div>
      </div>

      {/* DETAILED MATRIX */}
      <Card
        title={t('gapAnalysis.breakdownTitle')}
        subtitle="Evaluated against Pune industry hiring standards for Cloud Support Associate"
      >
        <Table
          columns={columns}
          data={data}
          keyExtractor={(row) => row.skill}
          caption="Detailed gap diagnosis comparing knowledge with authenticated evidence"
        />
      </Card>

      {/* ACTION GUIDANCE */}
      <div className="bg-[#f8fafc] border border-[#d9dde1] p-5 rounded">
        <h3 className="text-sm font-bold text-[var(--navy)] mb-2">
          Recommended Action Strategy for Riddhi Naskari:
        </h3>
        <ol className="text-xs text-[#2d3748] space-y-2 pl-4 list-decimal m-0">
          <li>
            <strong>Resolve the AWS Evidence Gap immediately:</strong> Complete the <em>"Troubleshoot a Cloud VPC Route Table Connectivity Failure"</em> task on the Experience Bridge. This will convert AWS into an authenticated competency.
          </li>
          <li>
            <strong>Apply for immediate interviews:</strong> Two of your target companies (DataGrid Systems and NextGen) currently require Linux and Incident Troubleshooting, which you have already verified.
          </li>
          <li>
            <strong>Enroll in Networking & Docker training:</strong> Pursue weekend vocational modules to address foundational skill gaps.
          </li>
        </ol>
      </div>
    </div>
  )
}
export default SkillEvidenceGap
