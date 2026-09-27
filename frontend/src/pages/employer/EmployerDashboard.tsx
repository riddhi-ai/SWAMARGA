import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Table, Column } from '../../components/ui/Table'
import { MetricCard } from '../../components/ui/MetricCard'
import { Building2, CheckCircle, Users, Briefcase, ArrowRight, ShieldCheck } from 'lucide-react'

interface CandidateValidationItem {
  id: number
  candidateName: string
  targetRole: string
  submittedCompetency: string
  taskTitle: string
  score: number
  submittedDate: string
  status: 'Pending Employer Review' | 'Validated'
}

export const EmployerDashboard: React.FC = () => {
  const { t } = useTranslation()

  const queue: CandidateValidationItem[] = [
    {
      id: 1,
      candidateName: 'Riddhi Naskari',
      targetRole: 'Cloud Support Associate',
      submittedCompetency: 'AWS Cloud Routing',
      taskTitle: 'Troubleshoot a Cloud VPC Route Table Connectivity Failure',
      score: 90,
      submittedDate: '27 Sep 2026',
      status: 'Pending Employer Review',
    },
    {
      id: 2,
      candidateName: 'Amit Deshmukh',
      targetRole: 'Cloud Support Associate',
      submittedCompetency: 'Linux System Recovery',
      taskTitle: 'Diagnose a Linux Service Failure (systemd)',
      score: 86,
      submittedDate: '26 Sep 2026',
      status: 'Pending Employer Review',
    },
    {
      id: 3,
      candidateName: 'Priya Sharma',
      targetRole: 'Junior DevOps Engineer',
      submittedCompetency: 'Docker Containers',
      taskTitle: 'Investigate a Docker Container CrashLoopBackOff Scenario',
      score: 94,
      submittedDate: '25 Sep 2026',
      status: 'Validated',
    },
  ]

  const columns: Column<CandidateValidationItem>[] = [
    {
      header: 'Candidate & Role',
      accessor: (row) => (
        <div>
          <span className="font-bold text-[var(--navy)] block text-sm">{row.candidateName}</span>
          <span className="text-[11px] text-[#5a6578]">{row.targetRole}</span>
        </div>
      ),
    },
    {
      header: 'Competency Submitted',
      accessor: (row) => (
        <div>
          <span className="font-semibold text-xs text-[#202124] block">{row.submittedCompetency}</span>
          <span className="text-[11px] text-[#5a6578] line-clamp-1">{row.taskTitle}</span>
        </div>
      ),
    },
    {
      header: 'System Score',
      accessor: (row) => (
        <span className="font-bold text-xs text-[#2e7a34]">
          {row.score} / 100
        </span>
      ),
    },
    {
      header: 'Validation Status',
      accessor: (row) => (
        row.status === 'Validated' ? (
          <Badge variant="verified">Validated</Badge>
        ) : (
          <Badge variant="pending">Pending Attestation</Badge>
        )
      ),
    },
    {
      header: 'Action',
      accessor: (row) => (
        <Link
          to={`/employer/validate?id=${row.id}`}
          className="gov-btn gov-btn-secondary gov-btn-sm"
        >
          <span>Review Evidence</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Employer Overview' }]} />

      <div className="border-b border-[#d9dde1] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--navy)] m-0">{t('employer.title')}</h1>
          <p className="text-sm text-[#5a6578] mt-1 mb-0">{t('employer.subtitle')}</p>
        </div>

        <Link to="/employer/validate" className="gov-btn gov-btn-primary gov-btn-sm">
          <ShieldCheck className="w-3.5 h-3.5 mr-1" />
          Review Validation Queue
        </Link>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Active Job Requisitions"
          value="4 Roles"
          context="Pune & Mumbai"
          subtext="Cloud Support, Trainee, IT Support"
          tone="default"
        />
        <MetricCard
          label="Awaiting Evidence Validation"
          value="2 Candidates"
          context="Action needed"
          subtext="Riddhi Naskari & Amit Deshmukh"
          tone="orange"
        />
        <MetricCard
          label="Verified Candidates Hired"
          value="14"
          context="Last quarter"
          subtext="92% 6-month retention rate"
          tone="green"
        />
        <MetricCard
          label="Competency Match Baseline"
          value="82%"
          context="Minimum threshold"
          subtext="Linux & Troubleshooting required"
          tone="default"
        />
      </div>

      {/* Evidence Validation Queue */}
      <Card
        title={t('employer.validationQueue')}
        subtitle="Review practical logs and issue employer attestation for candidate Competency Passports"
      >
        <Table
          columns={columns}
          data={queue}
          keyExtractor={(row) => row.id}
          caption="Employer candidate evidence validation queue"
        />
      </Card>
    </div>
  )
}
export default EmployerDashboard
