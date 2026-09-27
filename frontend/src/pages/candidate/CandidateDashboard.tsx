import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { apiService } from '../../services/api'
import { DEMO_CANDIDATE, DEMO_COMPETENCY_MATRIX, DEMO_EXPERIENCE_TASKS, DEMO_JOBS } from '../../services/mockData'
import type { Candidate, CompetencyStatusRow, ExperienceTask, Job } from '../../types'
import { Badge } from '../../components/ui/Badge'
import { Table } from '../../components/ui/Table'
import type { Column } from '../../components/ui/Table'
import { Alert } from '../../components/ui/Alert'
import { Card } from '../../components/ui/Card'
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs'
import { ArrowRight, CheckCircle2, AlertTriangle, FolderKanban } from 'lucide-react'

export const CandidateDashboard: React.FC = () => {
  const { t } = useTranslation()
  const [candidate, setCandidate] = useState<Candidate>(DEMO_CANDIDATE)
  const [matrix] = useState<CompetencyStatusRow[]>(DEMO_COMPETENCY_MATRIX)
  const [tasks] = useState<ExperienceTask[]>(DEMO_EXPERIENCE_TASKS)
  const [jobs, setJobs] = useState<Job[]>(DEMO_JOBS)

  useEffect(() => {
    async function loadData() {
      try {
        const [candData, jobsData] = await Promise.all([
          apiService.getCandidate(1),
          apiService.getJobs(),
        ])
        if (candData) setCandidate(candData)
        if (jobsData && jobsData.length > 0) setJobs(jobsData)
      } catch (err) {
        console.error('Failed to load candidate dashboard data', err)
      }
    }
    loadData()
  }, [])

  const matrixColumns: Column<CompetencyStatusRow>[] = [
    {
      header: t('candidate.skillCol'),
      accessor: (row) => (
        <div className="font-bold text-[var(--navy)]">
          {row.skill}
        </div>
      ),
    },
    {
      header: t('candidate.marketDemandCol'),
      accessor: (row) => (
        <Badge
          variant={row.marketDemand === 'High' ? 'high' : 'medium'}
          showIcon={false}
        >
          {row.marketDemand === 'High' ? t('common.high') : t('common.medium')} Demand
        </Badge>
      ),
    },
    {
      header: t('candidate.candidateStatusCol'),
      accessor: (row) => {
        if (row.skillStatus === 'Demonstrated') {
          return <Badge variant="verified">{t('common.demonstrated')}</Badge>
        }
        return <Badge variant="skillGap">{t('common.skillGap')}</Badge>
      },
    },
    {
      header: t('candidate.evidenceStatusCol'),
      accessor: (row) => {
        if (row.evidenceStatus === 'Verified') {
          return (
            <div className="flex flex-col gap-0.5">
              <Badge variant="verified">
                {t('common.verified')} (Score: {row.score}/100)
              </Badge>
              <span className="text-[11px] text-[#5a6578]">{row.evidenceType}</span>
            </div>
          )
        }
        if (row.evidenceStatus === 'Evidence Gap') {
          return (
            <div className="flex flex-col gap-0.5">
              <Badge variant="evidenceGap">{t('common.evidenceGap')}</Badge>
              <span className="text-[11px] text-[var(--orange-dark)] font-medium">
                Certification on file · Lacks practical proof
              </span>
            </div>
          )
        }
        return (
          <span className="text-xs text-[#5a6578] italic">
            {t('common.notDemonstrated')}
          </span>
        )
      },
    },
    {
      header: t('candidate.actionCol'),
      accessor: (row) => (
        <Link
          to={row.actionUrl}
          className="inline-flex items-center gap-1 text-xs font-bold text-[var(--navy)] hover:text-[var(--orange)] hover:underline"
        >
          <span>{row.recommendedAction}</span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
        </Link>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: t('nav.overview') }]} />

      {/* 1. ROLE CONTEXT BANNER */}
      <div className="bg-white border border-[#d9dde1] rounded p-5 sm:p-6 shadow-xs border-l-4 border-l-[var(--navy)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5a6578]">
                {t('candidate.targetRole')}
              </span>
              <span className="text-xs bg-[#eef2f7] text-[var(--navy)] font-semibold px-2 py-0.5 rounded">
                Pune Cluster
              </span>
            </div>
            <h1 className="text-2xl font-bold text-[var(--navy)] m-0">
              {candidate.target_role || 'Cloud Support Associate'}
            </h1>
            <p className="text-xs text-[#5a6578] mt-1 mb-0">
              Candidate: <strong className="text-[#202124]">{candidate.name}</strong> · Location: {candidate.location} · Profile Source: Demonstration Database
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/candidate/skill-evidence-gap"
              className="gov-btn gov-btn-secondary gov-btn-sm"
            >
              {t('candidate.viewGapBtn')}
            </Link>
            <Link
              to="/candidate/experience-bridge/2"
              className="gov-btn gov-btn-primary gov-btn-sm"
            >
              <FolderKanban className="w-4 h-4 mr-1" />
              {t('candidate.actionBridgeBtn')}
            </Link>
          </div>
        </div>
      </div>

      {/* 2. THE 4 CORE DIAGNOSTIC QUESTIONS */}
      <div className="gov-card">
        <h2 className="text-base font-bold text-[var(--navy)] mb-4">
          {t('candidate.keyQuestions')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-[#f8fafc] border border-[#d9dde1] rounded">
            <span className="font-bold text-[#5a6578] block mb-1">1. Market Requirement</span>
            <p className="text-[#202124] font-semibold m-0">
              5 Core Competencies demanded by 85% of regional cloud support recruiters: Linux, AWS, Networking, Troubleshooting, Docker.
            </p>
          </div>

          <div className="p-3 bg-[#eff9f0] border border-[#c2e5c6] rounded">
            <span className="font-bold text-[#2e7a34] block mb-1">2. Demonstrated & Verified</span>
            <p className="text-[#202124] font-semibold m-0">
              2 Competencies verified with high practical assessment scores: Linux (84/100) and Incident Troubleshooting (88/100).
            </p>
          </div>

          <div className="p-3 bg-[var(--orange-light)] border border-[#ffd5b8] rounded">
            <span className="font-bold text-[var(--orange-dark)] block mb-1">3. The Critical Evidence Gap</span>
            <p className="text-[#202124] font-semibold m-0">
              AWS: Certificate exists, but lacks authenticated practical workplace logs. Resolvable via 1 Experience Bridge task.
            </p>
          </div>

          <div className="p-3 bg-[#fdf2f2] border border-[#fecaca] rounded">
            <span className="font-bold text-[#d9383a] block mb-1">4. Priority Action</span>
            <p className="text-[#202124] font-semibold m-0">
              Execute AWS Cloud Routing Simulation to qualify for 3 open job opportunities in Pune immediately.
            </p>
          </div>
        </div>
      </div>

      {/* 3. DIAGNOSTIC ALERTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Alert
          variant="warning"
          title="Evidence Gap Identified (AWS)"
        >
          {t('candidate.evidenceGapAlert')}
        </Alert>

        <Alert
          variant="info"
          title="Skill Development Pathways (Networking & Docker)"
        >
          {t('candidate.skillGapAlert')}
        </Alert>
      </div>

      {/* 4. PRIMARY MATRIX */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#202124]">
            {t('candidate.matrixTitle')}
          </h2>
          <span className="text-xs text-[#5a6578]">
            Target Role: Cloud Support Associate · 5 Competencies Evaluated
          </span>
        </div>

        <Table
          columns={matrixColumns}
          data={matrix}
          keyExtractor={(row) => row.skill}
          caption="Detailed competency and practical evidence matrix for target role"
        />
      </div>

      {/* 5. EXPERIENCE BRIDGE TASKS */}
      <Card
        title="Experience Bridge: Practical Tasks Ready for Submission"
        subtitle="Complete these practical scenarios to convert your evidence gaps into verified Competency Passport entries"
        action={
          <Link
            to="/candidate/experience-bridge"
            className="text-xs font-bold text-[var(--navy)] hover:underline flex items-center gap-1"
          >
            <span>View All Tasks ({tasks.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-4 border border-[#d9dde1] rounded bg-white hover:border-[var(--navy)] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <Badge variant={task.skill === 'AWS' ? 'evidenceGap' : 'neutral'}>
                    {task.skill}
                  </Badge>
                  <span className="text-[11px] text-[#5a6578] font-medium">
                    {task.estimated_minutes} mins
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[var(--navy)] mb-1.5 leading-snug">
                  {task.title}
                </h4>
                <p className="text-xs text-[#5a6578] line-clamp-2 mb-3">
                  {task.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#eef1f3] flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[var(--orange-dark)]">
                  Bridges Evidence Gap
                </span>
                <Link
                  to={`/candidate/experience-bridge/${task.id}`}
                  className="gov-btn gov-btn-primary gov-btn-sm"
                >
                  Start Task
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 6. RELEVANT OPPORTUNITIES */}
      <Card
        title={t('candidate.matchedJobs')}
        subtitle="Opportunities in Pune & Mumbai matched on verified competencies and documented evidence"
        action={
          <Link
            to="/candidate/jobs"
            className="text-xs font-bold text-[var(--navy)] hover:underline flex items-center gap-1"
          >
            <span>All Opportunities ({jobs.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        }
      >
        <div className="divide-y divide-[#eef1f3]">
          {jobs.slice(0, 3).map((job) => (
            <div key={job.id} className="py-3.5 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-[var(--navy)] m-0">
                    {job.title}
                  </h4>
                  <span className="text-xs text-[#5a6578]">· {job.company}</span>
                  <span className="text-xs font-medium text-[#718096]">({job.location})</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  <span className="text-xs text-[#2e7a34] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified: Linux, Troubleshooting
                  </span>
                  <span className="text-xs text-[var(--orange-dark)] font-semibold ml-2 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Missing Evidence: AWS
                  </span>
                </div>
                <p className="text-xs text-[#5a6578] m-0 italic">
                  Why matched: {job.match_rationale}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <Link
                  to={`/candidate/jobs/${job.id}`}
                  className="gov-btn gov-btn-secondary gov-btn-sm"
                >
                  View Details
                </Link>
                <Link
                  to={`/candidate/experience-bridge/2`}
                  className="gov-btn gov-btn-primary gov-btn-sm"
                >
                  Resolve AWS Gap
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
export default CandidateDashboard
