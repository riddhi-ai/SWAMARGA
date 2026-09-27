import React from 'react'
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Table } from '../../components/ui/Table'
import type { Column } from '../../components/ui/Table'
import { MetricCard } from '../../components/ui/MetricCard'

interface VerificationQueueItem {
  id: number
  entityName: string
  entityType: 'Training Institute' | 'Employer Partner' | 'Academic Dept'
  location: string
  requestDate: string
  status: 'Pending Verification' | 'Approved'
}

export const AdminDashboard: React.FC = () => {
  const queue: VerificationQueueItem[] = [
    {
      id: 1,
      entityName: 'CloudNova Systems Pune',
      entityType: 'Employer Partner',
      location: 'Magarpatta, Pune',
      requestDate: '26 Sep 2026',
      status: 'Pending Verification',
    },
    {
      id: 2,
      entityName: 'Government ITI Haveli',
      entityType: 'Training Institute',
      location: 'Pune District',
      requestDate: '25 Sep 2026',
      status: 'Pending Verification',
    },
    {
      id: 3,
      entityName: 'TechCloud Solutions Pvt Ltd',
      entityType: 'Employer Partner',
      location: 'Hinjawadi, Pune',
      requestDate: '24 Sep 2026',
      status: 'Approved',
    },
  ]

  const columns: Column<VerificationQueueItem>[] = [
    {
      header: 'Organisation Name',
      accessor: (row) => <strong className="text-(--navy)">{row.entityName}</strong>,
    },
    {
      header: 'Entity Type',
      accessor: (row) => <span className="text-xs text-[#202124]">{row.entityType}</span>,
    },
    {
      header: 'Jurisdiction / Location',
      accessor: (row) => <span className="text-xs text-[#5a6578]">{row.location}</span>,
    },
    {
      header: 'Submission Date',
      accessor: (row) => <span className="text-xs text-[#5a6578]">{row.requestDate}</span>,
    },
    {
      header: 'Verification State',
      accessor: (row) => (
        row.status === 'Approved' ? (
          <Badge variant="verified">Approved</Badge>
        ) : (
          <Badge variant="pending">Pending Audit</Badge>
        )
      ),
    },
    {
      header: 'Action',
      accessor: (row) => (
        <button
          onClick={() => alert(`Verification approved for ${row.entityName}.`)}
          className="gov-btn gov-btn-secondary gov-btn-sm"
        >
          Verify Entity
        </button>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Administration Console' }]} />

      <div className="border-b border-[#d9dde1] pb-4">
        <h1 className="text-2xl font-bold text-(--navy) m-0">Platform Administration & Verification</h1>
        <p className="text-sm text-[#5a6578] mt-1 mb-0">
          Operational management, institute verification, employer onboarding, and database registry audit.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Registered Institutes"
          value="42"
          context="Statewide"
          subtext="36 Government ITIs & 6 Polytechnics"
          tone="default"
        />
        <MetricCard
          label="Verified Employers"
          value="18 Partners"
          context="Active hiring"
          subtext="TechCloud, CloudNova, DataGrid, etc."
          tone="green"
        />
        <MetricCard
          label="Pending Verification"
          value="2 Organisations"
          context="Queue"
          subtext="Requires document clearance"
          tone="orange"
        />
        <MetricCard
          label="Database Status"
          value="Online"
          context="FastAPI · SQLite"
          subtext="Seed Candidate ID #1 (Riddhi) Active"
          tone="green"
        />
      </div>

      <Card
        title="Institutional Verification Queue"
        subtitle="Organizations requesting formal participation in the Competency Passport framework"
      >
        <Table
          columns={columns}
          data={queue}
          keyExtractor={(row) => row.id}
          caption="Institutional verification queue"
        />
      </Card>
    </div>
  )
}
export default AdminDashboard


