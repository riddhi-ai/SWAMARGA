import React from 'react'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Table } from '../../components/ui/Table'
import type { Column } from '../../components/ui/Table'
import { Building2, Calendar } from 'lucide-react'

interface ApplicationRecord {
  id: number
  role: string
  company: string
  location: string
  appliedDate: string
  status: 'Under Review' | 'Evidence Requested' | 'Interview Scheduled'
  notes: string
}

export const Applications: React.FC = () => {
  const { t } = useTranslation()

  const applications: ApplicationRecord[] = [
    {
      id: 1,
      role: 'Cloud Support Associate',
      company: 'TechCloud Solutions Pvt Ltd',
      location: 'Pune (Hinjawadi)',
      appliedDate: '26 Sep 2026',
      status: 'Evidence Requested',
      notes: 'Employer requested practical AWS VPC task proof to proceed to round 2 technical discussion.',
    },
    {
      id: 2,
      role: 'Cloud Infrastructure Trainee',
      company: 'DataGrid Systems India',
      location: 'Pune (Viman Nagar)',
      appliedDate: '25 Sep 2026',
      status: 'Interview Scheduled',
      notes: 'Candidate verified Linux score (84) and Troubleshooting score (88) matched criteria. Scheduled for 30 Sep.',
    },
    {
      id: 3,
      role: 'Technical Support Engineer',
      company: 'NextGen Technologies',
      location: 'Mumbai (Airoli)',
      appliedDate: '24 Sep 2026',
      status: 'Under Review',
      notes: 'Competency Passport credentials accessed by recruitment panel.',
    },
  ]

  const columns: Column<ApplicationRecord>[] = [
    {
      header: 'Role & Organisation',
      accessor: (row) => (
        <div>
          <span className="font-bold text-(--navy) block text-sm">{row.role}</span>
          <span className="text-[11px] text-[#5a6578] flex items-center gap-1">
            <Building2 className="w-3 h-3" />
            {row.company} · {row.location}
          </span>
        </div>
      ),
    },
    {
      header: 'Date Submitted',
      accessor: (row) => (
        <span className="text-xs text-[#5a6578] flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          {row.appliedDate}
        </span>
      ),
    },
    {
      header: 'Application Status',
      accessor: (row) => {
        if (row.status === 'Interview Scheduled') {
          return <Badge variant="verified">Interview Scheduled</Badge>
        }
        if (row.status === 'Evidence Requested') {
          return <Badge variant="evidenceGap">Evidence Requested</Badge>
        }
        return <Badge variant="pending">Under Review</Badge>
      },
    },
    {
      header: 'Feedback / Next Steps',
      accessor: (row) => (
        <span className="text-xs text-[#2d3748] block max-w-sm">
          {row.notes}
        </span>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: t('nav.overview'), to: '/candidate' },
          { label: t('nav.applications') },
        ]}
      />

      <div className="border-b border-[#d9dde1] pb-4">
        <h1 className="text-2xl font-bold text-(--navy) m-0">{t('nav.applications')}</h1>
        <p className="text-sm text-[#5a6578] mt-1 mb-0">
          Track active applications and employer requests for verified competency evidence.
        </p>
      </div>

      <Card
        title="Active Applications"
        subtitle="Applications linked with your SWAMARGA Competency Passport"
      >
        <Table
          columns={columns}
          data={applications}
          keyExtractor={(row) => row.id}
          caption="Candidate job applications status and feedback tracking"
        />
      </Card>
    </div>
  )
}
export default Applications


