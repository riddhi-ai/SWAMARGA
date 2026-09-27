import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Table, Column } from '../../components/ui/Table'
import { MetricCard } from '../../components/ui/MetricCard'
import { DEMO_COURSE_HEALTH } from '../../services/mockData'
import { CourseHealthRecord } from '../../types'
import { GraduationCap, Users, Layers, TrendingUp, Sliders, ArrowRight, AlertTriangle } from 'lucide-react'

export const InstituteDashboard: React.FC = () => {
  const { t } = useTranslation()
  const [courses] = useState<CourseHealthRecord[]>(DEMO_COURSE_HEALTH)

  const columns: Column<CourseHealthRecord>[] = [
    {
      header: 'Course Program',
      accessor: (row) => (
        <div>
          <span className="font-bold text-[var(--navy)] block text-sm">{row.courseName}</span>
          <span className="text-[11px] text-[#5a6578]">Sector: {row.sector}</span>
        </div>
      ),
    },
    {
      header: 'Enrolled',
      accessor: (row) => <span className="font-semibold text-xs text-[#202124]">{row.enrolledStudents}</span>,
    },
    {
      header: 'Placement Rate',
      accessor: (row) => (
        <span className="font-bold text-xs text-[#2e7a34]">
          {row.placementRate}%
        </span>
      ),
    },
    {
      header: 'Market Alignment',
      accessor: (row) => {
        if (row.marketAlignment === 'Optimal') return <Badge variant="verified">Optimal</Badge>
        if (row.marketAlignment === 'Review Required') return <Badge variant="evidenceGap">Review Required</Badge>
        return <Badge variant="skillGap">Declining</Badge>
      },
    },
    {
      header: 'Priority Action',
      accessor: (row) => (
        <span className="text-xs text-[#2d3748] block max-w-xs">{row.action}</span>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Training Institute Overview' }]} />

      <div className="border-b border-[#d9dde1] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--navy)] m-0">{t('institute.title')}</h1>
          <p className="text-sm text-[#5a6578] mt-1 mb-0">{t('institute.subtitle')}</p>
        </div>

        <Link to="/institute/simulator" className="gov-btn gov-btn-primary gov-btn-sm">
          <Sliders className="w-3.5 h-3.5 mr-1" />
          Launch Capacity Simulator
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Active Trainees"
          value="265"
          context="Students enrolled"
          subtext="Across 3 technical departments"
          tone="default"
        />
        <MetricCard
          label="Average Placement"
          value="68.4%"
          context="Within 90 days"
          subtext="Pune regional benchmark: 62%"
          tone="green"
        />
        <MetricCard
          label="Course Health Index"
          value="1 Review Needed"
          context="Networking syllabus"
          subtext="Lacks modern cloud routing modules"
          tone="orange"
        />
        <MetricCard
          label="Trainer Capacity"
          value="8 / 10"
          context="Positions filled"
          subtext="2 Cloud Trainer vacancies active"
          tone="default"
        />
      </div>

      {/* Course Health Section */}
      <Card
        title={t('institute.courseHealthTitle')}
        subtitle="Evaluated against active recruiter demand in Maharashtra"
        action={
          <Link to="/institute/course-health" className="text-xs font-bold text-[var(--navy)] hover:underline flex items-center gap-1">
            <span>View All Health Reports</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        }
      >
        <Table
          columns={columns}
          data={courses}
          keyExtractor={(row) => row.id}
          caption="Institute course health and industry alignment table"
        />
      </Card>

      {/* Simulator Quick Teaser */}
      <div className="p-5 bg-white border border-[#d9dde1] rounded flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-[var(--orange)]">
        <div>
          <h3 className="text-base font-bold text-[var(--navy)] m-0">{t('institute.simulatorTitle')}</h3>
          <p className="text-xs text-[#5a6578] mt-1 mb-0 max-w-2xl">
            {t('institute.simulatorDesc')}
          </p>
        </div>
        <Link to="/institute/simulator" className="gov-btn gov-btn-primary shrink-0">
          Open What-If Simulator
        </Link>
      </div>
    </div>
  )
}
export default InstituteDashboard
