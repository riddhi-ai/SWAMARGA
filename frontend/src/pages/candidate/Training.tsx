import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Table, Column } from '../../components/ui/Table'
import { GraduationCap, MapPin, Calendar, Clock, ExternalLink } from 'lucide-react'

interface CoursePathway {
  id: number
  courseTitle: string
  institute: string
  location: string
  targetedGap: string
  duration: string
  format: 'Weekend Lab' | 'Full-time Vocational' | 'Blended'
  seatsAvailable: number
}

export const Training: React.FC = () => {
  const { t } = useTranslation()

  const pathways: CoursePathway[] = [
    {
      id: 1,
      courseTitle: 'Applied Cloud Networking & VPC Routing Lab',
      institute: 'Government Polytechnic, Pune',
      location: 'Shivajinagar, Pune',
      targetedGap: 'Networking (Skill Gap)',
      duration: '4 Weeks (Saturdays & Sundays)',
      format: 'Weekend Lab',
      seatsAvailable: 12,
    },
    {
      id: 2,
      courseTitle: 'Containerization & Docker Fundamentals for DevOps',
      institute: 'Industrial Training Institute (ITI) Aundh',
      location: 'Aundh, Pune',
      targetedGap: 'Docker (Skill Gap)',
      duration: '3 Weeks (Evening Batches)',
      format: 'Blended',
      seatsAvailable: 18,
    },
    {
      id: 3,
      courseTitle: 'Advanced Linux Infrastructure & Shell Automation',
      institute: 'VJTI Technology Transfer Center',
      location: 'Matunga, Mumbai',
      targetedGap: 'Advanced Linux Refinement',
      duration: '6 Weeks',
      format: 'Full-time Vocational',
      seatsAvailable: 8,
    },
  ]

  const columns: Column<CoursePathway>[] = [
    {
      header: 'Course Program',
      accessor: (row) => (
        <div>
          <span className="font-bold text-[var(--navy)] block text-sm">{row.courseTitle}</span>
          <span className="text-[11px] text-[#5a6578] flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {row.institute} · {row.location}
          </span>
        </div>
      ),
    },
    {
      header: 'Targeted Skill Gap',
      accessor: (row) => <Badge variant="skillGap">{row.targetedGap}</Badge>,
    },
    {
      header: 'Format & Schedule',
      accessor: (row) => (
        <div className="text-xs text-[#2d3748]">
          <span className="block font-medium">{row.format}</span>
          <span className="text-[11px] text-[#5a6578]">{row.duration}</span>
        </div>
      ),
    },
    {
      header: 'Capacity',
      accessor: (row) => (
        <span className="text-xs font-semibold text-[#2e7a34]">
          {row.seatsAvailable} seats available
        </span>
      ),
    },
    {
      header: 'Action',
      accessor: () => (
        <button
          onClick={() => alert('Enrollment inquiry dispatched to training center.')}
          className="gov-btn gov-btn-secondary gov-btn-sm"
        >
          <span>Enroll / Inquire</span>
          <ExternalLink className="w-3 h-3 ml-1" />
        </button>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: t('nav.overview'), to: '/candidate' },
          { label: t('nav.training') },
        ]}
      />

      <div className="border-b border-[#d9dde1] pb-4">
        <h1 className="text-2xl font-bold text-[var(--navy)] m-0">{t('nav.training')}</h1>
        <p className="text-sm text-[#5a6578] mt-1 mb-0">
          Vocational pathways specifically mapped to your identified Skill Gaps in Maharashtra.
        </p>
      </div>

      <div className="bg-[#eef2f7] border border-[#d4e0ee] p-4 rounded text-xs text-[var(--navy)] flex items-center justify-between">
        <div>
          <strong className="block text-sm font-bold text-[var(--navy)]">
            Curriculum Aligned with Experience Bridge
          </strong>
          These certified government institute programs incorporate SWAMARGA Experience Bridge scenario labs directly into their syllabus.
        </div>
      </div>

      <Card
        title="Recommended Training Modules"
        subtitle="Address Networking and Docker gaps through hands-on laboratory courses"
      >
        <Table
          columns={columns}
          data={pathways}
          keyExtractor={(row) => row.id}
          caption="Recommended vocational courses mapped to candidate skill gaps"
        />
      </Card>
    </div>
  )
}
export default Training
