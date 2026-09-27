import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Table, Column } from '../../components/ui/Table'
import { MetricCard } from '../../components/ui/MetricCard'
import { DEMO_DISTRICTS } from '../../services/mockData'
import { DistrictMetric } from '../../types'
import { Building2, TrendingUp, AlertTriangle, Sliders, ArrowRight, ShieldCheck } from 'lucide-react'

export const GovernmentDashboard: React.FC = () => {
  const { t } = useTranslation()
  const [districts] = useState<DistrictMetric[]>(DEMO_DISTRICTS)

  const columns: Column<DistrictMetric>[] = [
    {
      header: 'District Cluster',
      accessor: (row) => <strong className="text-[var(--navy)]">{row.district}</strong>,
    },
    {
      header: 'Annual Cloud / IT Demand',
      accessor: (row) => <span className="font-mono text-xs font-bold text-[#202124]">{row.targetRoleDemand} positions</span>,
    },
    {
      header: 'Active Enrolled Trainees',
      accessor: (row) => <span className="font-mono text-xs text-[#5a6578]">{row.activeTrainees}</span>,
    },
    {
      header: 'Certified Instructors',
      accessor: (row) => <span className="font-mono text-xs text-[#5a6578]">{row.certifiedTrainers}</span>,
    },
    {
      header: 'Capacity Deficit',
      accessor: (row) => (
        <span className="font-mono text-xs font-bold text-[#d9383a]">
          -{row.capacityDeficit}
        </span>
      ),
    },
    {
      header: 'Mismatch Risk Level',
      accessor: (row) => {
        if (row.mismatchLevel === 'High') return <Badge variant="skillGap">High Deficit</Badge>
        if (row.mismatchLevel === 'Moderate') return <Badge variant="evidenceGap">Moderate</Badge>
        return <Badge variant="verified">Balanced</Badge>
      },
    },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Government Intelligence Portal' }]} />

      <div className="border-b border-[#d9dde1] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-bold text-[#5a6578]">State Macro Intelligence</span>
            <span className="text-[10px] bg-[#f8fafc] text-[#5a6578] font-bold px-2 py-0.5 rounded border border-[#d9dde1]">
              Illustrative Prototype Data
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--navy)] m-0">{t('government.title')}</h1>
          <p className="text-sm text-[#5a6578] mt-1 mb-0">{t('government.subtitle')}</p>
        </div>

        <Link to="/government/simulator" className="gov-btn gov-btn-primary gov-btn-sm">
          <Sliders className="w-3.5 h-3.5 mr-1" />
          State Capacity Planning Simulator
        </Link>
      </div>

      <div className="p-3 bg-[#eef2f7] border border-[#d4e0ee] rounded text-xs text-[var(--navy)] flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[var(--orange)] shrink-0" />
        <span>{t('government.prototypeLabel')}</span>
      </div>

      {/* Macro State Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Statewide Role Demand"
          value="7,830"
          context="IT / Cloud Support"
          subtext="Concentrated in Pune & Mumbai"
          tone="default"
        />
        <MetricCard
          label="Institutional Output"
          value="4,980"
          context="Annual graduates"
          subtext="36% deficit against industry demand"
          tone="orange"
        />
        <MetricCard
          label="Priority Capacity Deficit"
          value="2,850 Seats"
          context="State aggregate"
          subtext="Requires trainer expansion"
          tone="red"
        />
        <MetricCard
          label="Passport Adoption"
          value="64.2%"
          context="Regional institutes"
          subtext="Adopting Experience Bridge modules"
          tone="green"
        />
      </div>

      {/* District Intelligence Breakdown */}
      <Card
        title={t('government.districtTitle')}
        subtitle="Evaluating training infrastructure against industry hiring requisitions by district"
        action={
          <Link to="/government/district-intelligence" className="text-xs font-bold text-[var(--navy)] hover:underline flex items-center gap-1">
            <span>View District Deep Dive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        }
      >
        <Table
          columns={columns}
          data={districts}
          keyExtractor={(row) => row.district}
          caption="District-level capacity deficit and demand distribution table"
        />
      </Card>
    </div>
  )
}
export default GovernmentDashboard
