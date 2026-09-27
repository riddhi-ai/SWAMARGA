import React from 'react'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Table } from '../../components/ui/Table'
import type { Column } from '../../components/ui/Table'
import { DEMO_CANDIDATE } from '../../services/mockData'
import { ShieldCheck, Printer, Building2 } from 'lucide-react'

interface PassportEntry {
  competency: string
  score: number | null
  candidateEvidence: string
  systemAssessment: string
  employerValidation: 'Validated' | 'Pending Attestation' | 'Not Submitted'
  validatingEmployer?: string
  verificationDate: string
}

export const CompetencyPassport: React.FC = () => {
  const { t } = useTranslation()

  const passportEntries: PassportEntry[] = [
    {
      competency: 'Linux System Administration & Service Recovery',
      score: 84,
      candidateEvidence: 'Diagnosed systemd Nginx crash; fixed syntax in conf.d; verified via ss -tulpn.',
      systemAssessment: 'Verified (Score: 84/100 · Automated Static Log Check)',
      employerValidation: 'Validated',
      validatingEmployer: 'TechCloud Solutions (Pune Engineering Team)',
      verificationDate: '24 Sep 2026',
    },
    {
      competency: 'Cloud Incident Troubleshooting & Log Isolation',
      score: 88,
      candidateEvidence: 'Completed live cloud troubleshooting scenario on Linux virtual instance.',
      systemAssessment: 'Verified (Score: 88/100 · Metric Benchmark Passed)',
      employerValidation: 'Validated',
      validatingEmployer: 'NextGen Technologies (Incident Management)',
      verificationDate: '25 Sep 2026',
    },
    {
      competency: 'AWS Cloud Routing & Gateway Endpoints',
      score: 90,
      candidateEvidence: 'VPC Gateway Endpoint routing scenario logs submitted via Experience Bridge.',
      systemAssessment: 'Verified (Score: 90/100 · Preliminary Benchmark)',
      employerValidation: 'Pending Attestation',
      validatingEmployer: 'CloudNova Systems (Under Review)',
      verificationDate: '27 Sep 2026',
    },
    {
      competency: 'Computer Networking (TCP/IP & Subnetting)',
      score: null,
      candidateEvidence: 'No practical simulation evidence submitted yet.',
      systemAssessment: 'Unassessed',
      employerValidation: 'Not Submitted',
      verificationDate: '—',
    },
  ]

  const columns: Column<PassportEntry>[] = [
    {
      header: 'Competency Area',
      accessor: (row) => (
        <div>
          <span className="font-bold text-[var(--navy)] block text-sm">{row.competency}</span>
          <span className="text-[11px] text-[#5a6578]">Verified on: {row.verificationDate}</span>
        </div>
      ),
    },
    {
      header: 'Practical Score',
      accessor: (row) => (
        row.score ? (
          <span className="font-bold text-[#2e7a34] text-sm">
            {row.score} / 100
          </span>
        ) : (
          <span className="text-xs text-[#5a6578] italic">Unassessed</span>
        )
      ),
    },
    {
      header: 'Candidate Evidence',
      accessor: (row) => (
        <span className="text-xs text-[#2d3748] block max-w-xs leading-relaxed">
          {row.candidateEvidence}
        </span>
      ),
    },
    {
      header: 'System Assessment',
      accessor: (row) => (
        <div className="text-xs">
          {row.score ? (
            <Badge variant="verified">Passed</Badge>
          ) : (
            <Badge variant="neutral">Pending</Badge>
          )}
        </div>
      ),
    },
    {
      header: 'Employer Validation',
      accessor: (row) => (
        <div>
          {row.employerValidation === 'Validated' ? (
            <div className="flex flex-col gap-0.5">
              <Badge variant="verified">Employer Validated</Badge>
              <span className="text-[10px] text-[#2e7a34] font-semibold flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                {row.validatingEmployer}
              </span>
            </div>
          ) : row.employerValidation === 'Pending Attestation' ? (
            <div className="flex flex-col gap-0.5">
              <Badge variant="pending">Pending Attestation</Badge>
              <span className="text-[10px] text-[#b45309] font-medium">
                {row.validatingEmployer}
              </span>
            </div>
          ) : (
            <Badge variant="neutral">Not Submitted</Badge>
          )}
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: t('nav.overview'), to: '/candidate' },
          { label: t('nav.passport') },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#d9dde1] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-bold text-[#5a6578]">
              Verified Public Credential
            </span>
            <Badge variant="verified">Active Credential</Badge>
          </div>
          <h1 className="text-2xl font-bold text-[var(--navy)] m-0">
            {t('passport.title')}
          </h1>
          <p className="text-sm text-[#5a6578] mt-1 mb-0">
            {t('passport.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="gov-btn gov-btn-secondary gov-btn-sm"
          >
            <Printer className="w-3.5 h-3.5 mr-1" />
            Print / Export
          </button>
        </div>
      </div>

      {/* PASSPORT SUMMARY HEADER */}
      <div className="bg-white border border-[#d9dde1] rounded p-6 shadow-xs border-t-4 border-t-[#3e9b45]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
          <div>
            <span className="text-[#5a6578] font-bold uppercase tracking-wider block mb-1">
              {t('passport.issuedTo')}
            </span>
            <span className="text-base font-bold text-[var(--navy)] block">
              {DEMO_CANDIDATE.name}
            </span>
            <span className="text-[#718096]">MCA Graduate · Pune, Maharashtra</span>
          </div>

          <div>
            <span className="text-[#5a6578] font-bold uppercase tracking-wider block mb-1">
              Target Role Profile
            </span>
            <span className="text-base font-bold text-[#202124] block">
              {DEMO_CANDIDATE.target_role}
            </span>
            <span className="text-[#718096]">Pune Region Information Technology Sector</span>
          </div>

          <div>
            <span className="text-[#5a6578] font-bold uppercase tracking-wider block mb-1">
              {t('passport.passportId')}
            </span>
            <span className="font-mono text-sm font-bold text-[#202124] block">
              MH-SWA-2026-008412
            </span>
            <span className="text-[#718096]">Registered in SWAMARGA State Ledger</span>
          </div>

          <div>
            <span className="text-[#5a6578] font-bold uppercase tracking-wider block mb-1">
              Verification Status
            </span>
            <span className="text-sm font-bold text-[#2e7a34] flex items-center gap-1.5 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
              2 Employer Validations
            </span>
            <span className="text-[#718096]">Last verified: 25 Sep 2026</span>
          </div>
        </div>
      </div>

      {/* AUTHENTICATION MATRIX */}
      <Card
        title={t('passport.competenciesList')}
        subtitle="Separates Candidate Evidence, System Automated Scoring, and Employer Partner Attestation"
      >
        <Table
          columns={columns}
          data={passportEntries}
          keyExtractor={(row) => row.competency}
          caption="Employer-validated competency passport entries"
        />
      </Card>

      {/* OFFICIAL NOTICE */}
      <div className="bg-[#f8fafc] border border-[#d9dde1] p-4 rounded text-xs text-[#5a6578] flex items-start gap-2.5">
        <ShieldCheck className="w-5 h-5 text-[var(--navy)] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[var(--navy)] font-bold block mb-0.5">
            Public Integrity & Employer Transparency Notice
          </strong>
          {t('passport.disclaimer')}
        </div>
      </div>
    </div>
  )
}
export default CompetencyPassport
