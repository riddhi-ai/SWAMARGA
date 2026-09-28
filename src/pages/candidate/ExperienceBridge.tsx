import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Table } from '../../components/ui/Table'
import type { Column } from '../../components/ui/Table'
import { DEMO_EXPERIENCE_TASKS } from '../../services/mockData'
import type { ExperienceTask } from '../../types'
import { ArrowRight, Clock, ShieldCheck } from 'lucide-react'

export const ExperienceBridge: React.FC = () => {
  const { t } = useTranslation()
  const [tasks] = useState<ExperienceTask[]>(DEMO_EXPERIENCE_TASKS)

  const columns: Column<ExperienceTask>[] = [
    {
      header: 'Task Designation',
      accessor: (row) => (
        <div>
          <span className="font-bold text-(--navy) block text-sm">{row.title}</span>
          <span className="text-[11px] text-[#5a6578]">{row.why_it_matters}</span>
        </div>
      ),
    },
    {
      header: 'Target Competency',
      accessor: (row) => (
        <Badge variant={row.skill === 'AWS' ? 'evidenceGap' : 'neutral'}>
          {row.skill}
        </Badge>
      ),
    },
    {
      header: 'Difficulty',
      accessor: (row) => (
        <span className="text-xs font-semibold text-[#202124]">
          {row.difficulty}
        </span>
      ),
    },
    {
      header: 'Est. Duration',
      accessor: (row) => (
        <div className="flex items-center gap-1 text-xs text-[#5a6578]">
          <Clock className="w-3.5 h-3.5" />
          <span>{row.estimated_minutes} min</span>
        </div>
      ),
    },
    {
      header: 'Action',
      accessor: (row) => (
        <Link
          to={`/candidate/experience-bridge/${row.id}`}
          className="gov-btn gov-btn-primary gov-btn-sm"
        >
          <span>Open Task</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: t('nav.overview'), to: '/candidate' },
          { label: t('nav.experienceBridge') },
        ]}
      />

      <div className="border-b border-[#d9dde1] pb-4">
        <h1 className="text-2xl font-bold text-(--navy) m-0">
          {t('experienceBridge.title')}
        </h1>
        <p className="text-sm text-[#5a6578] mt-1 mb-0">
          {t('experienceBridge.subtitle')}
        </p>
      </div>

      <div className="bg-(--orange-light) border border-[#ffd5b8] p-4 rounded flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-(--orange-dark) shrink-0 mt-0.5" />
        <div className="text-xs text-(--orange-dark)">
          <strong className="block text-sm font-bold text-(--orange-dark) mb-0.5">
            Employer-Verified Task Scenarios
          </strong>
          These simulation scenarios are curated directly from technical interview rubrics used by IT employers in Maharashtra. Evidence submitted here feeds directly into your official Competency Passport upon assessment.
        </div>
      </div>

      <Card
        title={t('experienceBridge.availableTasks')}
        subtitle="Select a scenario aligned with your target role to build authenticated evidence"
      >
        <Table
          columns={columns}
          data={tasks}
          keyExtractor={(row) => row.id}
          caption="Catalog of available Experience Bridge tasks"
        />
      </Card>
    </div>
  )
}
export default ExperienceBridge


