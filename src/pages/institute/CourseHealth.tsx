import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Table, Column } from '../../components/ui/Table'
import { DEMO_COURSE_HEALTH } from '../../services/mockData'
import { CourseHealthRecord } from '../../types'
import { Activity, AlertTriangle, CheckCircle2, Sliders } from 'lucide-react'

export const CourseHealth: React.FC = () => {
  const { t } = useTranslation()
  const [courses] = useState<CourseHealthRecord[]>(DEMO_COURSE_HEALTH)

  const columns: Column<CourseHealthRecord>[] = [
    {
      header: 'Course Program',
      accessor: (row) => (
        <div>
          <span className="font-bold text-(--navy) block text-sm">{row.courseName}</span>
          <span className="text-[11px] text-[#5a6578]">Sector: {row.sector}</span>
        </div>
      ),
    },
    {
      header: 'Enrolled Trainees',
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
      header: 'Health Status',
      accessor: (row) => {
        if (row.marketAlignment === 'Optimal') return <Badge variant="verified">Optimal Alignment</Badge>
        if (row.marketAlignment === 'Review Required') return <Badge variant="evidenceGap">Curriculum Review Required</Badge>
        return <Badge variant="skillGap">Declining Demand</Badge>
      },
    },
    {
      header: 'Identified Skill Deficiency',
      accessor: (row) => (
        <span className="text-xs text-(--orange-dark) font-medium block">
          Missing: {row.topMissingSkill}
        </span>
      ),
    },
    {
      header: 'Prescribed Intervention',
      accessor: (row) => (
        <span className="text-xs text-[#2d3748] block max-w-xs">{row.action}</span>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Institute Overview', to: '/institute' },
          { label: t('nav.courseHealth') },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#d9dde1] pb-4">
        <div>
          <h1 className="text-2xl font-bold text-(--navy) m-0">Course Health Intelligence</h1>
          <p className="text-sm text-[#5a6578] mt-1 mb-0">
            Identify emerging, declining, and outdated curriculum modules based on Maharashtra hiring requirements.
          </p>
        </div>

        <Link to="/institute/simulator" className="gov-btn gov-btn-primary gov-btn-sm">
          <Sliders className="w-3.5 h-3.5 mr-1" />
          Test Course Adjustment in Simulator
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white border border-[#d9dde1] rounded border-l-4 border-l-[#3e9b45]">
          <span className="text-xs font-bold text-[#2e7a34] block mb-1">Optimal Alignment</span>
          <span className="text-xl font-bold text-[#202124] block">1 Course</span>
          <span className="text-xs text-[#5a6578]">Cloud Infrastructure & Linux (78% placement)</span>
        </div>

        <div className="p-4 bg-white border border-[#d9dde1] rounded border-l-4 border-l-(--orange)">
          <span className="text-xs font-bold text-(--orange-dark) block mb-1">Needs Modernization</span>
          <span className="text-xl font-bold text-[#202124] block">1 Course</span>
          <span className="text-xs text-[#5a6578]">Diploma in Computer Hardware & Networking</span>
        </div>

        <div className="p-4 bg-white border border-[#d9dde1] rounded border-l-4 border-l-[#d9383a]">
          <span className="text-xs font-bold text-[#d9383a] block mb-1">Declining Market Demand</span>
          <span className="text-xl font-bold text-[#202124] block">1 Course</span>
          <span className="text-xs text-[#5a6578]">Traditional Server Administration (On-Prem)</span>
        </div>
      </div>

      <Card
        title="Curriculum Alignment Diagnostics"
        subtitle="Evaluated against active recruiter competency requirements in Pune and Mumbai"
      >
        <Table
          columns={columns}
          data={courses}
          keyExtractor={(row) => row.id}
          caption="Detailed course health analysis"
        />
      </Card>
    </div>
  )
}
export default CourseHealth


